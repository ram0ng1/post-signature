<p align="center">
  <img src="icon.svg" width="80" height="80" alt="Post Signature">
</p>

<h1 align="center">Post Signature</h1>

<p align="center">
  <img alt="Flarum" src="https://img.shields.io/badge/flarum-2.x-e7672e?style=flat-square">
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square"></a>
  <a href="https://donate.stripe.com/fZe5o66nebkf39S28a"><img alt="Donate" src="https://img.shields.io/badge/donate-stripe-6772E5?style=flat-square"></a>
</p>

<p align="center">Old school forum signatures under every post.</p>

Post Signature takes the user bio from <a href="https://github.com/FriendsOfFlarum/user-bio">fof/user-bio</a> and renders it as a signature in the footer of each post, the way MyBB and the classic boards used to do. Formatted bios keep their formatting, plain ones come out as plain text.

No settings, no database tables. Install, enable, done.

## Requirements

- Flarum 2.x
- `fof/user-bio` for the bio field itself

## Installation

```sh
composer require ramon/post-signature
php flarum cache:clear
```

Then enable Post Signature on the Extensions page.

## License

[MIT](LICENSE). Bugs and suggestions go in the [issue tracker](https://github.com/ram0ng1/post-signature/issues).
