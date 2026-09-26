# LAUNCHPAD lesson recordings

Every LAUNCHPAD lesson read aloud in the natural voice (Kokoro "Heart"), made
once by `launchpad-app/scripts/recorder/record-lessons.mts` so a phone plays a
file instead of running the voice model. The app finds a lesson's recording by
the key of its prepared text; `<key>.json` says where every sentence and word
falls in `<key>.mp3`, which is what read-aloud highlights as it goes.

After editing a lesson, record it again (only the changed lessons are made):

    cd launchpad-app/scripts/recorder && npm install && npm run record

`launchpad-app/src/lib/voice/recordings.test.ts` fails until you do.
