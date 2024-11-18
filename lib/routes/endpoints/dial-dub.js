const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /dial-dub');
  try {
    const app = new WebhookResponse();
    app
      .dub({
        action: 'addTrack',
        track: 'a'
      })
      .say({text: 'please hold while we connect you'})
      .dial({
        answerOnBridge: true,
        callerId: '+15083728299',
        target: [{type: 'user', name: 'xhoaluu2@sip.jambonz.me'}],
        dub: [
            {
              action: 'addTrack',
              track: 'b',
            }
          ],
      });
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});


module.exports = router;
