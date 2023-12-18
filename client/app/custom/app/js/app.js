// GL.directive(`footer`, ['$filter', '$compile', function($filter, $compile) {
//     return {
//         restrict: 'E',
//         replace: false,
//         templateUrl: 'views/custom/footer.html',
//         link: function(scope, element, attrs) {
//             const translate = $filter('translate');

//             scope.translate = translate;

//             console.log('out: scope', scope.managed, scope.powered);

//             const managedWatch = () => translate('Footer platform managed by');
//             const poweredWatch = () => translate('Footer platform powered by');

//             scope.$watch(() => {
//                 return [managedWatch(), poweredWatch()];
//             }, function([managed, powered], oldVal) {
//                 // setTimeout(function() {
//                     scope.managed = managed;
//                     scope.powered = powered;
//                     console.log('scope', scope.managed, scope.powered);
//                     console.log({element})
//                     $compile(element)(scope); // Double compilation
//                 // }, 1000);
//             });
//         },
//     };
// }]);

// GL.mockEngine.addMock("*", "#FooterBox", function(elem) {
//     return '<div data-per-site-footer></div>';
// });
/*angular.element(document.body).ready(function() {
    angular.element(document.querySelector('[data-ng-app]'))
    .injector()
    .invoke(['$filter', '$compile', '$translate', '$rootScope', function($filter, $compile, $translate, $rootScope) {
        const translate = $filter('translate');

            
        $rootScope.translate = translate;
        $rootScope.$watch('[translate(\'Footer platform managed by\'), translate(\'Footer platform powered by\')]', function([managed, powered], oldVal) {
            GL.mockEngine.addMock("*", "#FooterBox", function(elem) {
                var ret = "<div>";
                // gt.setLocale(lang_code);
                // gt.addTranslations(lang_code, "main", gettextParser.po.parse(fs.readFileSync("pot/" + lang_code + ".po")));
                ret += `<div>${managed}</div>`;
                ret += `<div>Powered by <a rel='noreferrer noopener' href='https://www.globaleaks.org/'>GlobaLeaks</a>. ${powered}</div>`;
                        
                ret += "</div>";
                return ret;
            });
        }, true);
    }]);
});
*/