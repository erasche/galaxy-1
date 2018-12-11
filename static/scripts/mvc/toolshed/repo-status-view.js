define("mvc/toolshed/repo-status-view",["exports","backbone","underscore","utils/localization","mvc/toolshed/toolshed-model","mvc/toolshed/util"],function(e,t,o,r,s,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}Object.defineProperty(e,"__esModule",{value:!0});var d=l(t),n=l(o),c=a(r),p=a(s),u=a(i),h=d.View.extend({el:"#center",initialize:function(e){var t=this;this.options=n.defaults(this.options||[{}],e,this.defaults),this.model=new p.default.RepoStatus,this.listenTo(this.model,"sync",this.render),this.model.url+="?repositories="+this.options.repositories.join("|"),this.model.fetch(),this.timer=window.setInterval(function(){var e=["installed","error"],o=!0;n.some(t.model.models,function(t){var r=t.get("status").toLowerCase();if(-1===e.indexOf(r))return o=!1,!0}),o?window.clearInterval(t.timer):t.model.fetch()},2e3)},close:function(){window.clearInterval(this.timer)},render:function(e){this.options=n.extend(this.options,e);var t=this.templateRepoStatus;this.$el.html(t({title:(0,c.default)("Repository Status"),repositories:this.model.models,queue:u.default.queueLength()})),$("#center").css("overflow","auto")},templateRepoStatus:n.template(['<div class="unified-panel-header" id="panel_header" unselectable="on">','<div class="unified-panel-header-inner"><%= title %><a class="ml-auto" href="#/queue">Repository Queue (<%= queue %>)</a></div>',"</div>",'<style type="text/css">',".state-color-new,",".state-color-deactivated,",".state-color-uninstalled { border-color:#bfbfbf; background:#eee }",".state-color-cloning,",".state-color-setting-tool-versions,",".state-color-installing-repository-dependencies,",".state-color-installing-tool-dependencies,",".state-color-loading-proprietary-datatypes { border-color:#AAAA66; background:#FFFFCC }",".state-color-installed { border-color:#20b520; background:#b0f1b0 }",".state-color-error { border-color:#dd1b15; background:#f9c7c5 }","</style>",'<table id="grid-table" class="grid">','<thead id="grid-table-header">',"<tr>",'<th id="null-header">Name<span class="sort-arrow"></span></th>','<th id="null-header">Description<span class="sort-arrow"></span></th>','<th id="null-header">Owner<span class="sort-arrow"></span></th>','<th id="null-header">Revision<span class="sort-arrow"></span></th>','<th id="null-header">Installation Status<span class="sort-arrow"></span></th>',"</tr>","</thead>",'<tbody id="grid-table-body">',"<% _.each(repositories, function(repository) { %>","<tr>","<td>",'<div id="" class="">','<label id="repo-name-<%= repository.get("id") %>" for="<%= repository.get("id") %>">','<%= repository.get("name") %>',"</label>","</div>","</td>","<td>",'<div id="" class="">','<label id="repo-desc-<%= repository.get("id") %>" for="<%= repository.get("id") %>">','<%= repository.get("description") %>',"</label>","</div>","</td>","<td>",'<div id="" class="">','<label id="repo-user-<%= repository.get("id") %>" for="<%= repository.get("id") %>">','<%= repository.get("owner") %>',"</label>","</div>","</td>","<td>",'<div id="" class="">','<label id="repo-changeset-<%= repository.get("id") %>" for="<%= repository.get("id") %>">','<%= repository.get("changeset_revision") %>',"</label>","</div>","</td>","<td>",'<div id="" class="">','<label id="RepositoryStatus-<%= repository.get("id") %>" for="<%= repository.get("id") %>">','<div class="repo-status count-box state-color-<%= repository.get("status").toLowerCase().replace(/ /g, "-") %>" id="RepositoryStatus-<%= repository.get("id") %>">','<%= repository.get("status") %>',"</div>","</label>","</div>","</td>","</tr>","<% }); %>","</tbody>",'<tfoot id="grid-table-footer"></tfoot>',"</table>"].join(""))});e.default={RepoStatus:h}});