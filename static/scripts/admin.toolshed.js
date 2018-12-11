define("admin.toolshed",["exports","backbone","mvc/toolshed/shed-list-view","mvc/toolshed/categories-view","mvc/toolshed/repositories-view","mvc/toolshed/repository-view","mvc/toolshed/repository-queue-view","mvc/toolshed/repo-status-view","mvc/toolshed/workflows-view"],function(e,o,t,i,s,r,a,d,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var l=function(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(o[t]=e[t]);return o.default=e,o}(o),h=u(t),p=u(i),c=u(s),w=u(r),f=u(a),_=u(d),m=u(n),y=l.Router.extend({initialize:function(){this.routesHit=0,l.history.on("route",function(){this.routesHit++},this),this.bind("route",this.trackPageview)},routes:{"":"toolsheds",sheds:"toolsheds",queue:"queue",workflows:"workflows","status/r/:repositories":"status",status:"status","categories/s/:tool_shed":"categories","category/s/:tool_shed/c/:cateory_id":"repositories","repository/s/:tool_shed/r/:repository_id":"repository"},back:function(){this.routesHit>1?window.history.back():this.navigate("#",{trigger:!0,replace:!0})}}),v=l.View.extend({app_config:{known_views:["toolsheds","queue","status","categories","repositories","repository"]},initialize:function(){Galaxy.admintoolshedapp=this,this.admin_toolshed_router=new y,this.admin_toolshed_router.on("route:queue",function(){Galaxy.admintoolshedapp.adminRepoQueueView=new f.default.RepoQueueView}),this.admin_toolshed_router.on("route:toolsheds",function(){Galaxy.admintoolshedapp.adminShedListView=new h.default.ShedListView}),this.admin_toolshed_router.on("route:categories",function(e){Galaxy.admintoolshedapp.adminShedCategoriesView=new p.default.CategoryView({tool_shed:e.replace(/\//g,"%2f")})}),this.admin_toolshed_router.on("route:repositories",function(e,o){Galaxy.admintoolshedapp.adminShedCategoryView=new c.default.Category({tool_shed:e.replace(/\//g,"%2f"),category_id:o})}),this.admin_toolshed_router.on("route:repository",function(e,o){Galaxy.admintoolshedapp.adminRepositoryView=new w.default.RepoDetails({tool_shed:e.replace(/\//g,"%2f"),repository_id:o})}),this.admin_toolshed_router.on("route:status",function(e){Galaxy.admintoolshedapp.adminRepoStatusView=new _.default.RepoStatus({repositories:e.split("|")})}),this.admin_toolshed_router.on("route:workflows",function(){Galaxy.admintoolshedapp.adminWorkflowsView=new m.default.Workflows}),l.history.start({pushState:!1})}});e.default={GalaxyApp:v}});