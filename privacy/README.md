# Privacy page release notes

`privacy/index.html` is the source for <https://thingineeer.github.io/privacy/>.
The `thingineeer/thingineeer.github.io` repository publishes the root of
`main` through GitHub Pages' `pages-build-deployment` workflow. A push to
`main` is therefore a production privacy-policy deployment.

## UsageMaster owner confirmation

Do not publish the UsageMaster revision until the operator has confirmed:

- the public operator name, trade name, privacy officer, phone number and
  support email are current;
- Firebase Analytics user/event retention is configured to the period stated
  on the page, including whether retention resets on new activity;
- the support Gmail mailbox deletes messages when the inquiry purpose is
  complete and has a documented deletion-request procedure;
- the Firestore database remains in `nam5` and ranking Functions remain in
  `us-central1`;
- opting out of diagnostics stops Analytics and Crashlytics immediately;
- disabling ranking stops future submissions, and support can delete the
  existing Firebase Auth user, nickname claim, profile, submission, rank and
  migration records within a documented response period;
- Google/Firebase processing terms and the current subprocessor list have
  been reviewed for the operator's actual legal status;
- a Korean privacy professional has reviewed the final notice. This repository
  documentation is a technical disclosure, not legal advice.

After publishing, open both the canonical URL and the `#usagemaster` anchor in
a private browser window and verify the GitHub Pages response was built from
the intended commit.
