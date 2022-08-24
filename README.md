# Balena Application plugin for Grafana

![Application](https://raw.githubusercontent.com/volkovlabs/volkovlabs-balena-app/main/src/img/app.png)

[![Grafana 9](https://img.shields.io/badge/Grafana-9.1.0-orange)](https://www.grafana.com)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/VolkovLabs/volkovlabs-balena-app.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/VolkovLabs/volkovlabs-balena-app/context:javascript)
![CI](https://github.com/volkovlabs/volkovlabs-balena-app/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-balena-app/branch/main/graph/badge.svg?token=2W9VR0PG5N)](https://codecov.io/gh/VolkovLabs/volkovlabs-balena-app)
[![Balena](https://github.com/volkovlabs/volkovlabs-balena-app/actions/workflows/balena.yml/badge.svg)](https://github.com/volkovlabs/volkovlabs-balena-app/actions/workflows/balena.yml)

## Introduction

The Balena Application plugin for Grafana allows to display device information and manage services using Balena Supervisor API.

Working in a productive alliance, Balena, Grafana, and the Balena Application plugin simplify managing a network of non-homogenous IoT devices. If needed, a device could be made accessible directly, which means internet access is not required.

[![Balena Application plugin for Grafana | Connect to your IoT devices directly from Grafana](https://raw.githubusercontent.com/volkovlabs/volkovlabs-balena-app/main/img/video.png)](https://youtu.be/5NfrVdOX0s8)

### Requirements

- Grafana 8.5+, Grafana 9.0+ is required.

## Getting Started

The Balena application is not included in the Grafana Marketplace. It can be installed manually from our Private Repository or downloaded directly from the GitHub repository:

```bash
grafana-cli --repo https://volkovlabs.io/plugins plugins install volkovlabs-balena-app
```

## balenaCloud

Our custom Grafana build with the Balena Application plugin can be deployed directly to balenaCloud:

[![Deploy with balena](https://balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/volkovlabs/volkovlabs-balena-app)

We recommend to add it to your `docker-compose.yml` together with NGINX reverse proxy (example configuration in the repository):

```yaml
version: '2.1'

services:
  grafana:
    image: ghcr.io/volkovlabs/balena-app:latest
    network_mode: host
    restart: always
    labels:
      io.balena.features.supervisor-api: '1'
    volumes:
      - grafana-data:/var/lib/grafana

  nginx:
    build:
      context: ./nginx
      dockerfile: Dockerfile
    network_mode: host
    restart: always
    depends_on:
      - grafana

volumes:
  grafana-data:
```

Default Grafana username and password is **admin/admin**.

You can learn more about balena Labels in the [Documentation](https://www.balena.io/docs/reference/supervisor/docker-compose/#labels).

## Features

- Allows to display device, release information and service logs using Balena Supervisor API.
- Provides Services Panel to start, stop, restart Containers.
- Allows to filter Logs using Regex pattern.
- Requires Confirmation to restart all Services and reboot the device.
- Environment Variables sanitized from Target State.

## Balena Supervisor

The balena Supervisor is balena's agent that runs on devices. Its main role is to ensure your app is running, and keep communications with the balenaCloud API server.

The Supervisor has its own [set of APIs](https://www.balena.io/docs/reference/supervisor/supervisor-api/) providing means for services to communicate and execute some special actions that affect the host OS or the services itself.

## Provisioning

Grafana supports managing data sources by adding one or more YAML config files in the `provisioning/datasources` folder.

Example of provisioning the Balena Supervisor Data Source.

```yaml
datasources:
  - name: API
    type: volkovlabs-balenasupervisor-datasource
    uid: P9E471951A1B4106C
    jsonData:
      url: ${BALENA_SUPERVISOR_ADDRESS}
    secureJsonData:
      apiKey: ${BALENA_SUPERVISOR_API_KEY}
```

## Feedback

We love to hear from users, developers, and the whole community interested in this plugin. These are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-balena-app/issues/new/choose).
- Star the repository to show your support.

## Contributing

- Fork the repository.
- Find an issue to work on and submit a pull request.
- Could not find an issue? Look for documentation, bugs, typos, and missing features.

## License

- Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-balena-app/blob/main/LICENSE).
