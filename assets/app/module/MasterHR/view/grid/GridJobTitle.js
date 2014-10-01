Ext.define('ERPh.module.MasterHR.view.grid.GridJobTitle',{
	extend 		: 'Ext.grid.Panel',
	store 		: 'ERPh.module.MasterHR.store.JobTitle',
	title 		: 'List of Job Title',
	alias 		: 'widget.gridjobtitle',
	id 			: 'gridjobtitle',
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
			store 	: 'ERPh.module.MasterHR.store.JobTitle',
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
			text 		: 'Job Level',
			dataIndex	: 'namejoblevel',
			width 		: '25%'
		},
		{
			text 		: 'Name',
			dataIndex 	: 'name',
			width 		: '40%'
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