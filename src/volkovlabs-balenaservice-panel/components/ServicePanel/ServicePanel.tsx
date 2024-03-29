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
  ContainerStatus,
  DataSourceApi,
  Device,
  getSupervisorDatasource,
  ServiceContainer,
  StateStatus,
  SupervisorAPIDataSource,
  TargetState,
} from '@volkovlabs/volkovlabs-balenasupervisor-datasource';
import { ControlMode, ControlModeOptions } from '../../constants';
import { ContainerIcon, DeviceIcon, ImageIcon, ReleaseIcon } from '../../icons';
import { Styles } from '../../styles';
import { ServiceOptions } from '../../types';
import { StateDrawer } from '../StateDrawer';

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
   * Device
   */
  device: Device | null;

  /**
   * State Status
   */
  stateStatus: StateStatus | null;

  /**
   * State Status
   */
  targetState: TargetState | null;

  /**
   * Loading message
   */
  loading: string;

  /**
   * Application Id to Restart
   */
  restartAppId: number;

  /**
   * Reboot Device
   */
  reboot: boolean;

  /**
   * State Drawer
   */
  stateDrawer: boolean;
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
      device: null,
      stateStatus: null,
      targetState: null,
      loading: 'Loading...',
      restartAppId: 0,
      stateDrawer: false,
      reboot: false,
    };
  }

  /**
   * State Status Refresh
   */
  async getStateStatus() {
    setTimeout(async () => {
      if (!this.refresh) {
        return;
      }

      if (!this.datasource || !this.datasource.api) {
        this.getStateStatus();
        return;
      }

      /**
       * Target State
       */
      const device = await this.datasource.api.getDevice();
      const stateStatus = await this.datasource.api.getStateStatus();
      const targetState = await this.datasource.api.getTargetState();
      this.setState({ device, targetState, stateStatus, loading: '' });

      this.getStateStatus();
    }, this.props.options.refresh);
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

    /**
     * Target State
     */
    const device = await this.datasource.api.getDevice();
    const stateStatus = await this.datasource.api.getStateStatus();
    const targetState = await this.datasource.api.getTargetState();
    this.setState({ device, targetState, stateStatus, loading: '' });

    /**
     * Timeout
     */
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
   * Reboot Device
   */
  onRebootDevice = async () => {
    if (!this.datasource || !this.datasource.api) {
      return;
    }

    /**
     * Restart
     */
    await this.datasource.api.rebootDevice();
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
                this.setState((prevState) => ({ restartAppId: this.state.stateStatus?.containers[0].appId || 0 }));
              }}
              icon="sync"
              variant="destructive"
            >
              Restart services
            </Button>
          )}

          {this.state.mode === ControlMode.DEVICE && this.state.stateStatus?.release && (
            <Button
              onClick={() => {
                this.setState({ reboot: true });
              }}
              icon="sync"
              variant="destructive"
            >
              Reboot
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
          this.state.stateStatus.containers.length > 0 &&
          this.state.stateStatus.containers
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
                      disabled={container.status === ContainerStatus.RUNNING}
                      onClick={() => {
                        this.onStartService(container);
                      }}
                    />
                    <IconButton
                      key="stop"
                      name="pause"
                      tooltip="Stop"
                      disabled={container.status !== ContainerStatus.RUNNING}
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

        {this.state.mode === ControlMode.IMAGE &&
          this.state.stateStatus &&
          this.state.stateStatus.images.length > 0 &&
          this.state.stateStatus.images
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

        {this.state.mode === ControlMode.DEVICE &&
          this.state.device &&
          this.state.stateStatus &&
          this.state.stateStatus.release && (
            <>
              <Card>
                <Card.Heading>Device</Card.Heading>
                <Card.Description>{`IP Address: ${this.state.device.ipAddress}`}</Card.Description>
                <Card.Figure>
                  <DeviceIcon size={40} />
                </Card.Figure>
                <Card.Meta>
                  {[`Supervisor: ${this.state.device.supervisorVersion}`, `${this.state.device.osVersion}`]}
                </Card.Meta>
                <Card.Tags>
                  <TagList tags={[this.state.device.status]} />
                </Card.Tags>
              </Card>
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
                <Card.Actions>
                  {this.state.targetState && (
                    <Button
                      onClick={() => {
                        this.setState({ stateDrawer: true });
                      }}
                      icon="layer-group"
                      variant="secondary"
                    >
                      Target State
                    </Button>
                  )}
                </Card.Actions>
                <Card.Tags>
                  <TagList tags={[this.state.stateStatus.appState]} />
                </Card.Tags>
              </Card>
            </>
          )}

        <ConfirmModal
          isOpen={!!this.state.restartAppId}
          title="Restart Application Services"
          body={'Please confirm to restart all Application Services.'}
          confirmText="Confirm"
          icon="exclamation-triangle"
          onConfirm={() => {
            this.onRestartAllServices(this.state.restartAppId);
            this.setState({ restartAppId: 0 });
          }}
          onDismiss={() => this.setState({ restartAppId: 0 })}
        />

        <ConfirmModal
          isOpen={!!this.state.reboot}
          title="Reboot Device"
          body={'Please confirm to reboot the device.'}
          confirmText="Confirm"
          icon="exclamation-triangle"
          onConfirm={() => {
            this.onRebootDevice();
            this.setState({ reboot: false });
          }}
          onDismiss={() => this.setState({ reboot: false })}
        />

        {this.state.stateDrawer && this.state.targetState && (
          <StateDrawer
            targetState={this.state.targetState}
            onClose={() => {
              this.setState({ stateDrawer: false });
            }}
          ></StateDrawer>
        )}
      </div>
    );
  }
}
