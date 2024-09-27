module.exports = function(grunt) {
  let fs = require("fs"),
      path = require("path"),
      Printer = require('console-table-printer');

  const tasks = {
    'updateTranslations': function() {
      console.group(`Custom translations`);
      const stats = {
        Found: 0,
        Translated: 0
      }
      const table = new Printer.Table({
        columns: [
          { name: '', alignment: 'right', color: 'normal' },
          { name: 'Found' },
        ]
      });
      const source_pot = path.join("app", "assets", "data_src", "pot");
      const source_assets = path.join("app", "assets", "data", "l10n");
      const base_path = path.join("app", "custom", "assets", "data");

      grunt.file.recurse(source_pot, function(absdir, rootdir, subdir, filename) {
        stats.Found++;
        var lang_code = filename.replace(/.po$/, "");
        const current_file = path.join(source_assets, `${lang_code}.json`);
        var translations = JSON.parse(fs.readFileSync(current_file));
        try {
          var custom_translations = JSON.parse(fs.readFileSync(`${base_path}/${lang_code}.json`));
          console.debug(`Custom translations for ${base_path}/${lang_code}.json`);
          table.addRow({'': `${base_path}/${lang_code}.json`, Found: '✓'}, {color: 'green'});
        } catch (e) {
          table.addRow({'': `${base_path}/${lang_code}.json`, Found: '✗'}, {color: 'red'});
          return;
        }
        var output = {...translations, ...custom_translations};
        fs.writeFileSync(current_file, JSON.stringify(output, null, 2));
        stats.Translated++;
      });
      table.printTable();
      Printer.printTable([stats]);
      console.groupEnd();

    }
  };

  Object.keys(tasks).forEach((key) => {
    grunt.registerTask(`luna:${key}`, tasks[key]);
  });

};