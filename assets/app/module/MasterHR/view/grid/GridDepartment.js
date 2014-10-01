Ext.define('ERPh.module.MasterHR.view.grid.GridDepartment',{
	extend 		: 'Ext.grid.Panel',
	store 		: 'ERPh.module.MasterHR.store.Department',
	title 		: 'List of Department',
	alias 		: 'widget.griddepartment',
	id 			: 'griddepartment',
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
			store 	: 'ERPh.module.MasterHR.store.Department',
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
			text 		: 'Code',
			dataIndex 	: 'code',
			width 		: '20%'
		},
		{
			text 		: 'Name',
			dataIndex 	: 'name',
			width 		: '70%'
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