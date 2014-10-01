Ext.define('ERPh.module.MasterHR.view.grid.GridOfficeHour',{
	extend 		: 'Ext.grid.Panel',
	store 		: 'ERPh.module.MasterHR.store.OfficeHour',
	title 		: 'List of OfficeHour',
	alias 		: 'widget.gridofficehour',
	id 			: 'gridofficehour',
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
			store 	: 'ERPh.module.MasterHR.store.OfficeHour',
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
			width 		: '50%'
		},
		{
			text 		: 'Time In',
			dataIndex 	: 'time_in',
			width 		: '20%'
		},
		{
			text 		: 'Time Out',
			dataIndex 	: 'time_out',
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