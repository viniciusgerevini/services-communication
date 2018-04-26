# Services Communication Playground

The goal of this experiment is to create multiple services with different languages communicating through messages.

## Solution

// TODO

## What I have so far

- [Message Bus](https://github.com/viniciusgerevini/nchan-message-bus)
- [Sydney Public Transport Realtime API](https://github.com/viniciusgerevini/sydney-realtime-transport)

## Assumptions and Decisions:

- Cities are identified by [ISO Alpha2 Country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) + `_` + `uppercase city name`. e.g. `AU_SYDNEY`
- I'm not using any secret management tool, because it would increase significantly the complexity of the solution, so this is out of scope for now.
- For the sake of simplicity, I'm using for the message bus an NGINX/NCHAN server with a minimal configuration.
