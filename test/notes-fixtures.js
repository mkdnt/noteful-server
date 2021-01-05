function makeNotesArray() {
    return [
        {
            id: 1,
            name: 'Note One',
            content: 'This is a note that is note one',
            modified: '2029-01-22T16:28:32.615Z',
            folder_id: 1
        },
        {
            id: 2,
            name: 'Note Two',
            content: 'This is a note that is note two',
            modified: '2029-01-22T16:28:32.615Z',
            folder_id: 2
        },
        {
            id: 3,
            name: 'Note Three',
            content: 'This is a note that is note three',
            modified: '2029-01-22T16:28:32.615Z',
            folder_id: 3
        }
    ]
}

function makeMaliciousNote() {
    const maliciousNote = {
        id: 1234,
        name: 'Naughty naughty very naughty <script>alert("xss");</script>',
        content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
        modified: new Date().toISOString(),
        folder_id: 1
    };
    const expectedNote = {
        ...maliciousNote,
        name:
          'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
        content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
      };
      return {
          maliciousNote,
          expectedNote,
      }
}

module.exports = {
    makeNotesArray,
    makeMaliciousNote,
}