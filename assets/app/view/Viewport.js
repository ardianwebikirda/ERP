Ext.define('ERPh.view.panel.Dashboard', {
    extend	:'Ext.container.Container',
    alias 	: 'widget.paneldashboard',
    id		:'paneldashboard',
    initComponent:function(){
        var a = this;
        Ext.apply(a,{
            title	: 'DASHBOARD',
            iconCls	: 'icon-house',
            layout	:{
            	type:'fit', align:'stretch'
            },
            xtype	: 'container',
            border	: false,
            frame	: true,
            items	:[
                {
                    xtype		: 'form',
                    frame		: false,
                    layout      : 'fit',
                    border		: false,
                    hideHeader	: true,
                    bodyStyle	: {
                    	background:' #DDDDFF no-repeat center center'
                    },
                    padding		:'3px',
                    html		:'<div id="welcome">Welcome to Vinoti Human Resource Informastion System</div>'
                }
            ]
        });
        a.callParent(arguments);
    }
});

Ext.define('ERPh.view.Tab',{
    extend			: 'Ext.tab.Panel',
    alias 			: 'widget.mainTab',
    resizeTabs		: true,
    id				: 'mainTab',
    layout			: 'fit',
    border			: false,
    margins			: '2px 2px 2px 0px',
    bodyStyle		: 'background : transparent',
    closeAction		: 'hide',
    autoDestroy		: false,
    frame			: false,
    plain			: true,
    enableTabScroll	: true,
    defaults		: { 
    	autoScroll:true 
    },
    items			: [
        {
        	xtype:'paneldashboard'
        }
    ]
});

Ext.define('ERPh.view.Menu',{
    extend	:'Ext.tree.Panel',
    alias 	:'widget.mainmenu',
    initComponent:function(){
        var a=this;Ext.apply(a,{
            margins		: '2px 0px 2px 2px',
            title		: 'MAIN MENU',
            id			: 'mainmenu',
            iconCls		: 'icon-application_home',
            cls 		: 'scrollarea',
            store 		: 'ERPh.store.TreeStore',
            xtype		: 'panel',
            autoScroll	: true,
            rootVisible	: false,
            useArrows	: true,
            layout		: 'fit',
            bodyStyle	: 'padding : 0px',
            disabled	: false,
            width		: 250,
            border		: true,
            frame		: false,
            collapsible	: true,
            split		: true,
            items		: [],
            tbar 		: [
                {
                    id		: 'user',
                    text	: USERNAME,
                    tooltip	: 'Show Profile',
                    iconCls	: 'icon-user_b',
                    action  : 'rubah'
                },
                '->',
                {
                    id		: 'logout',
                    text	: 'LOGOUT',
                    tooltip	: 'Exit Application',
                    iconCls	: 'icon-cancel',
                    action  : 'logout'
                }
            ]
        });
        a.callParent(arguments)
    }
});

Ext.define('ERPh.view.Viewport', 
{
	extend		: 'Ext.container.Viewport',
	requires 	: 'ERPh.view.Menu',
	alias 		: 'widget.viewport',
	id 			: 'viewport',
	initComponent : function(){
		Ext.apply(this,{
			layout 		: 'border',
			xtype		: 'panel',
			defaults	: {frame: true, border: true},
			border		: true,
			items		:[
				{
					xtype 	: 'panel',
					layout 	: 'fit',
					region	: 'north',
					title 	: 'HUMAN RESOURCE INFORMATION SYSTEM',
					id		: 'appHeader'
				},
				{
					xtype	: 'mainmenu',
					region 	: 'west',
					width	: 200
				},
                {
                    region	: 'center',
                    xtype	: 'mainTab'
                },				
				{
					id 		: 'mainContainer ',
					xtype 	: 'panel',
					region	: 'south',
					layout	: 'fit',
					margins : '2px 2px 2x 2px',
					bbar       : [                    
                        '->',
                        {
                            text        : 'Copyright &copy; 2014 VL Team ERP',
                            disabled    : true
                        },
                        '-',
                        {
                            text        : 'Vinoti Enterprise Resource Planning',
                            disabled    : true
                        },
                        '-',
                        {
                            id          : 'dateStatus',
                            text        : '01-01-1970',
                            disabled    : true
                        },
                        '-',
                        {
                            id          : 'timeStatus',
                            disabled    : true,
                            text        : '00:00:00'
                        }
                    ]        
				}
			]   
		});
		this.callParent(arguments);	
	}	
});