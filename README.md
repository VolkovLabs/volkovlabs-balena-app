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

- Grafana 9.0+ is required.

## Getting Started

The Balena Application is not included in the Grafana Catalog. It can be installed manually from our Private Repository or downloaded directly from the GitHub repository:

```bash
grafana-cli --repo https://volkovlabs.io/plugins plugins install volkovlabs-balena-app
```

Our custom Grafana build with the Balena Application plugin can be deployed directly to balenaCloud:

[![Deploy with balena](https://balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/volkovlabs/volkovlabs-balena-app)

## Features

- Allows to display device, release information, and service logs using Balena Supervisor API.
- Provides Services Panel to start, stop, and restart Containers.
- Allows to filter Logs using a Regex pattern.
- Requires Confirmation to restart all Services and reboot the device.
- Environment Variables sanitized from Target State.

## Documentation

| Section | Description |
| -- | -- |
| [balenaCloud](https://volkovlabs.io/plugins/volkovlabs-balena-app/balenaCloud) | Explains how to use balena Application in balenaCloud. |
| [Provisioning](https://volkovlabs.io/plugins/volkovlabs-balena-app/provisioning) | Demonstrates how to automatically provision balenaSupervisor Data Source. |

## Feedback

We love to hear from you. There are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-balena-app/issues/new/choose).
- Sponsor our open-source plugins for Grafana with [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Star the repository to show your support.

## License

- Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-balena-app/blob/main/LICENSE).
