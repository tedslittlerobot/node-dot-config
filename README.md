Dot Config
==========

A wrapper around storing and retrieving config from .config

## Installation

```bash
npm i dot-config
```

## Basic Usage

```typescript
import config from 'dot-config';

config.store('my-config-file.json', {foo: 'bar'});
// Stores {foo: 'bar'} as JSON to ~/.config/my-config-file.json

config.get('my-config-files.json');
// Gets {foo: 'bar'}
```
