import moment from 'moment';

const grammar = require('usfm-grammar');
const path = require('path');
const md5 = require('md5');

export const createVersificationUSFM = (username, project, versification, books, direction,
  version) => {
  const newpath = localStorage.getItem('userPath');
  const folder = path.join(newpath, 'autographa', 'users', username, 'projects', project.projectName, 'ingredients');
  const schemes = [
    { name: 'King James Version (KJV)', file: 'eng.json' },
    { name: '', file: 'lxx.json' },
    { name: '', file: 'org.json' },
    { name: '', file: 'rsc.json' },
    { name: '', file: 'rso.json' },
    { name: '', file: 'vul.json' },
  ];
  const ingredients = {};
  return new Promise((resolve) => {
    schemes.forEach(async (scheme) => {
      if (versification === scheme.name) {
        // eslint-disable-next-line import/no-dynamic-require
        const file = require(`../lib/versification/${scheme.file}`);
        await books.forEach((book) => {
          const list = file.maxVerses;
          if (list[book]) {
            const chapters = [];
            (list[book]).forEach((verse, i) => {
              // eslint-disable-next-line vars-on-top
              let contents = [{ p: null }];
              const verses = [];
              for (let i = 1; i <= parseInt(verse, 10); i += 1) {
                verses.push({
                  verseNumber: i.toString(),
                  verseText: '',
                  // contents: [],
                });
              }
              contents = contents.concat(verses);
              chapters.push({
                chapterNumber: (i + 1).toString(),
                contents,
              });
            });
            const usfm = {
              book: {
                bookCode: book,
              },
              chapters,
              // _messages: {
              //   _warnings: [],
              // },
            };
            const myJsonParser = new grammar.JSONParser(usfm);
            const isJsonValid = myJsonParser.validate();
            if (isJsonValid) {
              const reCreatedUsfm = myJsonParser.toUSFM();
              const fs = window.require('fs');
              if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
              }
              fs.writeFileSync(path.join(folder, `${book}.usfm`), reCreatedUsfm);
              const stats = fs.statSync(path.join(folder, `${book}.usfm`));
              ingredients[path.join('ingredients', `${book}.usfm`)] = {
                checksum: {
                  md5: md5(reCreatedUsfm),
                },
                mimeType: 'text/x-usfm',
                size: stats.size,
                scope: {},
              };
              ingredients[path.join('ingredients', `${book}.usfm`)].scope[book] = [];
            }
          }
        });
        const fs = window.require('fs');
        await fs.writeFileSync(path.join(folder, 'versification.json'), JSON.stringify(file));
        const stats = fs.statSync(path.join(folder, 'versification.json'));
        ingredients[path.join('ingredients', 'versification.json')] = {
          checksum: {
            md5: md5(file),
          },
          mimeType: 'application/json',
          size: stats.size,
          role: 'x-versification',
        };
        const settings = {
          Editor: {
            ScriptureDirection: direction,
            starred: false,
            Description: project.description,
            LastSeen: moment().format(),
            Version: version.name,
            Abbreviation: version.abbreviation,
          },
        };
        await fs.writeFileSync(path.join(folder, 'AG.json'), JSON.stringify(settings));
        const stat = fs.statSync(path.join(folder, 'AG.json'));
        ingredients[path.join('ingredients', 'AG.json')] = {
          checksum: {
            md5: md5(settings),
          },
          mimeType: 'application/json',
          size: stat.size,
          role: 'x-autographa',
        };
        resolve(ingredients);
      }
    });
  });
};
