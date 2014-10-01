Ext.define('ERPh.module.MasterHR.view.grid.GridJobLevel',{
	extend 		: 'Ext.grid.Panel',
	store 		: 'ERPh.module.MasterHR.store.JobLevel',
	title 		: 'List of JobLevel',
	alias 		: 'widget.gridjoblevel',
	id 			: 'gridjoblevel',
	margins 	: '0px 5px 5px 0px',
	selModel 	: {
		selType 	: 'checkboxmodel',
		mode 		: 'MULTI',
		checkOnly 	: true,
		width 		: '3%',
		action 		: 'selected'
	},
	dockedItems 	: [
		{
			xtype 	: 'pagingtoolbar',
			store 	: 'ERPh.module.MasterHR.store.JobLevel',
			dock 	: 'bottom',
			// displayInfo : true
		}
	],
	columns		: [
		{
			xtype 		: 'rownumberer',
			text 		: 'No',
			width 		: '5%'
		},
		{
			text 		: 'Name',
			dataIndex 	: 'name',
			width 		: '70%'
		},
		{
			text 		: 'Level',
			dataIndex 	: 'level',
			width 		: '20%'
		}
	],
	tbar 		: [
        { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete' },
        '->',
        {
            fieldLabel          : 'Search',
            xtype               : 'textfield',
            emptyText           : 'Type Here for Search....',
            width               : '80%',
            caseSensitive       : false,
            enableKeyEvents     : true,
            action              : 'search'
        }
	]
});