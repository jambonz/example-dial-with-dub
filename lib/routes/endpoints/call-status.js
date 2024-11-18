const router = require('express').Router();

router.post('/', async (req, res) => {
  const {logger, client} = req.app.locals;
  logger.debug({payload: req.body}, 'call status');

  const {call_sid, parent_call_sid, call_status} = req.body;
  // When b leg answered the call
  if (parent_call_sid && call_status === 'in-progress') {
    // send dub message for both legs.
    [call_sid, parent_call_sid].forEach((sid) => {
      client.calls.update(sid, {
        dub: {
          action: 'sayOnTrack',
          track: sid === call_sid ? 'b' : 'a',
          say: 'this call is being recorded'
        }
      }).catch((err) => logger.error({err}, 'Error performing Live Call Control'));
    });
  }

  res.sendStatus(200);
});

module.exports = router;
