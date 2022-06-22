# Balena Application plugin for Grafana

[![Grafana 9](https://img.shields.io/badge/Grafana-9-orange)](https://www.grafana.com)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/VolkovLabs/volkovlabs-balena-app.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/VolkovLabs/volkovlabs-balena-app/context:javascript)
![CI](https://github.com/volkovlabs/volkovlabs-balena-app/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-balena-app/branch/main/graph/badge.svg?token=2W9VR0PG5N)](https://codecov.io/gh/VolkovLabs/volkovlabs-balena-app)

## Introduction

The Balena Application plugin for Grafana allows to display and manage devices using Balena Supervisor API.

### Requirements

- Grafana 8.5+, Grafana 9.0+ is required.

## Getting Started

The Balena application is under development and not included in the Grafana Marketplace yet. It can be installed manually from our private repository or downloaded directly from the GitHub repository:

```bash
grafana-cli --repo https://volkovlabs.io/plugins plugins install volkovlabs-balena-app
```

## Features

- Allows to display device information and service logs using Balena Supervisor API.
- Provides Services Management panel to start, stop, restart Containers.
- Allows to Filter Logs using Regex pattern.

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
