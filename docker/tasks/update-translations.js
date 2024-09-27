module.exports = function(grunt) {
  let fs = require("fs"),
      path = require("path"),
      Printer = require('console-table-printer');

  const tasks = {
    'updateTranslations': function() {
      console.group(`Custom translations`);
      const stats = {
        found: 0,
        translated: 0
      }
      const statsTable = new Printer.Table({
        title: 'Stats',
        columns: [
          { name: '', alignment: 'right', color: 'normal' },
          { name: 'Found', alignment: 'center' },
        ]
      });
      const statsTableSummary = new Printer.Table({
        title: 'Summary',
        columns: [
          { name: 'found', title: 'Found' },
          { name: 'translated', title: 'Translated' },
        ]
      });
      const source_pot = path.join("app", "assets", "data_src", "pot");
      const source_assets = path.join("app", "assets", "data", "l10n");
      const base_path = path.join("app", "custom", "assets", "data");

      grunt.file.recurse(source_pot, function(absdir, rootdir, subdir, filename) {
        stats.found++;
        var lang_code = filename.replace(/.po$/, "");
        const current_file = path.join(source_assets, `${lang_code}.json`);
        var translations = JSON.parse(fs.readFileSync(current_file));
        try {
          var custom_translations = JSON.parse(fs.readFileSync(`${base_path}/${lang_code}.json`));
          console.debug(`Custom translations for ${base_path}/${lang_code}.json`);
          statsTable.addRow({'': `${base_path}/${lang_code}.json`, Found: '✓'}, {color: 'green'});
        } catch (e) {
          statsTable.addRow({'': `${base_path}/${lang_code}.json`, Found: '✗'}, {color: 'red'});
          return;
        }
        var output = {...translations, ...custom_translations};
        fs.writeFileSync(current_file, JSON.stringify(output, null, 2));
        stats.translated++;
      });
      statsTable.printTable();
      statsTableSummary.addRow(stats);
      statsTableSummary.printTable();
      console.groupEnd();

    }
  };

  Object.keys(tasks).forEach((key) => {
    grunt.registerTask(`luna:${key}`, tasks[key]);
  });

};