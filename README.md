# Balena Application for Grafana

![Application](https://raw.githubusercontent.com/volkovlabs/volkovlabs-balena-app/main/src/img/app.png)

[![Grafana 9](https://img.shields.io/badge/Grafana-9.3.2-orange)](https://www.grafana.com)
[![YouTube](https://img.shields.io/badge/YouTube-Playlist-red)](https://youtube.com/playlist?list=PLPow72ygztmRdzBPeQ16cwM7ZvPbXfyHv)
![CI](https://github.com/volkovlabs/volkovlabs-balena-app/workflows/CI/badge.svg)
[![Balena](https://github.com/volkovlabs/volkovlabs-balena-app/actions/workflows/balena.yml/badge.svg)](https://github.com/volkovlabs/volkovlabs-balena-app/actions/workflows/balena.yml)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-balena-app/branch/main/graph/badge.svg?token=2W9VR0PG5N)](https://codecov.io/gh/VolkovLabs/volkovlabs-balena-app)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-balena-app/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-balena-app/actions/workflows/codeql-analysis.yml)

## Introduction

The Balena Application plugin for Grafana allows to display device information and manage services using Balena Supervisor API.

Working in a productive alliance, Balena, Grafana, and the Balena Application plugin simplify managing a network of non-homogenous IoT devices. If needed, a device could be made accessible directly, which means internet access is not required.

[![Balena Application plugin for Grafana | Connect to your IoT devices directly from Grafana](https://raw.githubusercontent.com/volkovlabs/volkovlabs-balena-app/main/img/video.png)](https://youtu.be/5NfrVdOX0s8)

### Requirements

- Grafana 8.5+, Grafana 9.0+ is required.

## Getting Started

The Balena Application is not included in the Grafana Catalog. It can be installed manually from our Private Repository or downloaded directly from the GitHub repository:

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

## IoT Framework

This video highlights just one example of many possible solutions when you can combine balena for IoT networking and Grafana with open-source one-click away features on top.

[![IoT Framework based on balena and Grafana | Open source Grafana plugins](https://raw.githubusercontent.com/volkovlabs/volkovlabs-balena-app/main/img/framework.png)](https://youtu.be/zf98C3lux54)

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
- Sponsor our open-source plugins for Grafana with [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Star the repository to show your support.

## License

- Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-balena-app/blob/main/LICENSE).
