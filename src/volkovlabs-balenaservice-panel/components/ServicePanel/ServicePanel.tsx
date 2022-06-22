import React, { PureComponent } from 'react';
import { css, cx } from '@emotion/css';
import { dateTime, PanelProps } from '@grafana/data';
import {
  Alert,
  Button,
  Card,
  ConfirmModal,
  IconButton,
  LoadingPlaceholder,
  RadioButtonGroup,
  TagList,
} from '@grafana/ui';
import {
  DataSourceApi,
  getSupervisorDatasource,
  ServiceContainer,
  StateStatus,
  SupervisorAPIDataSource,
} from '../../../volkovlabs-balenasupervisor-datasource';
import { ControlMode, ControlModeOptions } from '../../constants';
import { ContainerIcon, ImageIcon, ReleaseIcon } from '../../icons';
import { Styles } from '../../styles';
import { ServiceOptions } from '../../types';

/**
 * Properties
 */
interface Props extends PanelProps<ServiceOptions> {}

/**
 * State
 */
interface State {
  /**
   * Control Mode
   */
  mode: ControlMode;

  /**
   * State Status
   */
  stateStatus: StateStatus | null;

  /**
   * Loading message
   */
  loading: string;

  /**
   * Application Id to Restart
   */
  restartAppId: number;
}

/**
 * Service Panel
 */
export class ServicePanel extends PureComponent<Props, State> {
  datasource: DataSourceApi | null = null;
  refresh = true;

  /**
   * Constructor
   *
   * @param props {Props} Properties
   */
  constructor(props: Props) {
    super(props);

    /**
     * Default state
     */
    this.state = {
      mode: ControlMode.CONTAINER,
      stateStatus: null,
      loading: 'Loading...',
      restartAppId: 0,
    };
  }

  /**
   * Mount
   */
  async getStateStatus() {
    /**
     * Refresh
     */
    setTimeout(async () => {
      if (!this.refresh) {
        return;
      }

      if (!this.datasource || !this.datasource.api) {
        this.getStateStatus();
        return;
      }

      const stateStatus = await this.datasource.api.getStateStatus();
      this.setState({ stateStatus, loading: '' });
      this.getStateStatus();
    }, 1000);
  }

  /**
   * Mount
   */
  async componentDidMount() {
    this.datasource = await getSupervisorDatasource(this.props.data);

    /**
     * API
     */
    if (!this.datasource || !this.datasource.api) {
      console.error(`Data Source '${SupervisorAPIDataSource}' is not defined`);
      return;
    }

    this.getStateStatus();
  }

  /**
   * Stop refresh on Unmount
   */
  async componentWillUnmount() {
    this.refresh = false;
  }

  /**
   * Start Service
   */
  onStartService = async (container: ServiceContainer) => {
    if (!this.datasource || !this.datasource.api) {
      return;
    }

    /**
     * Start
     */
    await this.datasource.api.startApplicationService(container.appId, container.serviceName);
  };

  /**
   * Stop Service
   */
  onStopService = async (container: ServiceContainer) => {
    if (!this.datasource || !this.datasource.api) {
      return;
    }

    /**
     * Stop
     */
    await this.datasource.api.stopApplicationService(container.appId, container.serviceName);
  };

  /**
   * Restart Service
   */
  onRestartService = async (container: ServiceContainer) => {
    if (!this.datasource || !this.datasource.api) {
      return;
    }

    /**
     * Restart
     */
    await this.datasource.api.restartApplicationService(container.appId, container.serviceName);
  };

  /**
   * Restart Services
   */
  onRestartAllServices = async (appId: number) => {
    if (!this.datasource || !this.datasource.api) {
      return;
    }

    /**
     * Restart
     */
    await this.datasource.api.restartApplicationServices(appId);
  };

  /**
   * Change control mode
   */
  onChangeMode = async (event: ControlMode) => {
    if (event === undefined) {
      return;
    }

    this.setState({ mode: event });
  };

  /**
   * Render
   */
  render() {
    const { height, width } = this.props;
    const styles = Styles();

    /**
     * Loading
     */
    if (this.state.loading) {
      return (
        <Alert severity="info" title="Please wait">
          <LoadingPlaceholder text={this.state.loading} />
        </Alert>
      );
    }

    return (
      <div
        className={cx(
          styles.wrapper,
          css`
            width: ${width}px;
            height: ${height}px;
          `
        )}
      >
        <div className="page-action-bar">
          <RadioButtonGroup value={this.state.mode} options={ControlModeOptions} onChange={this.onChangeMode} />

          <div className="page-action-bar__spacer" />
          {this.state.mode === ControlMode.CONTAINER && this.state.stateStatus?.containers.length && (
            <Button
              onClick={() => {
                this.setState({ restartAppId: this.state.stateStatus?.containers[0].appId || 0 });
              }}
              icon="sync"
              variant="secondary"
            >
              Restart services
            </Button>
          )}
        </div>

        {this.state.mode === ControlMode.CONTAINER && !this.state.stateStatus?.containers.length && (
          <Alert severity="info" title="Getting Started">
            Please add containers.
          </Alert>
        )}

        {this.state.mode === ControlMode.IMAGE && !this.state.stateStatus?.images.length && (
          <Alert severity="info" title="Getting Started">
            Please add images.
          </Alert>
        )}

        {this.state.mode === ControlMode.DEVICE && !this.state.stateStatus?.release && (
          <Alert severity="warning" title="Getting Started">
            Device is not found.
          </Alert>
        )}

        {this.state.mode === ControlMode.CONTAINER &&
          this.state.stateStatus &&
          this.state.stateStatus.containers.length > 0 && (
            <>
              {this.state.stateStatus.containers
                .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
                .map((container, index) => {
                  return (
                    <Card key={index}>
                      <Card.Heading>{container.serviceName}</Card.Heading>
                      <Card.Meta>
                        {[`Created At: ${dateTime(container.createdAt).toString()}`, `Id: ${container.serviceId}`]}
                      </Card.Meta>
                      <Card.Figure>
                        <ContainerIcon size={40} />
                      </Card.Figure>
                      <Card.Tags>
                        <TagList tags={[container.status]} />
                      </Card.Tags>
                      <Card.SecondaryActions className={cx(styles.cardButton)}>
                        <IconButton
                          key="start"
                          name="play"
                          tooltip="Start"
                          disabled={container.status === 'Running'}
                          onClick={() => {
                            this.onStartService(container);
                          }}
                        />
                        <IconButton
                          key="stop"
                          name="pause"
                          tooltip="Stop"
                          disabled={container.status !== 'Running'}
                          onClick={() => {
                            this.onStopService(container);
                          }}
                        />
                        <IconButton
                          key="restart"
                          name="sync"
                          tooltip="Restart"
                          onClick={() => {
                            this.onRestartService(container);
                          }}
                        />
                      </Card.SecondaryActions>
                    </Card>
                  );
                })}
            </>
          )}

        {this.state.mode === ControlMode.IMAGE && this.state.stateStatus && this.state.stateStatus.images.length > 0 && (
          <>
            {this.state.stateStatus.images
              .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
              .map((image, index) => {
                return (
                  <Card key={index}>
                    <Card.Heading>{image.serviceName}</Card.Heading>
                    <Card.Figure>
                      <ImageIcon size={40} />
                    </Card.Figure>
                    <Card.Meta>
                      {[
                        `Download Progress: ${image.downloadProgress ? image.downloadProgress : 'Done'}`,
                        `Id: ${image.imageId}`,
                      ]}
                    </Card.Meta>
                    <Card.Tags>
                      <TagList tags={[image.status]} />
                    </Card.Tags>
                  </Card>
                );
              })}
          </>
        )}

        {this.state.mode === ControlMode.DEVICE && this.state.stateStatus && this.state.stateStatus.release && (
          <Card>
            <Card.Heading>Release</Card.Heading>
            <Card.Description>{this.state.stateStatus.release}</Card.Description>
            <Card.Figure>
              <ReleaseIcon size={40} />
            </Card.Figure>
            <Card.Meta>
              {[
                `Download Progress: ${
                  this.state.stateStatus.overallDownloadProgress
                    ? this.state.stateStatus.overallDownloadProgress
                    : 'Done'
                }`,
              ]}
            </Card.Meta>
            <Card.Tags>
              <TagList tags={[this.state.stateStatus.appState]} />
            </Card.Tags>
          </Card>
        )}

        <ConfirmModal
          isOpen={!!this.state.restartAppId}
          title="Restart Application Services"
          body={'Please confirm to restart all Application Services'}
          confirmText="Confirm"
          icon="exclamation-triangle"
          onConfirm={() => {
            this.onRestartAllServices(this.state.restartAppId);
            this.setState({ restartAppId: 0 });
          }}
          onDismiss={() => this.setState({ restartAppId: 0 })}
        />
      </div>
    );
  }
}
