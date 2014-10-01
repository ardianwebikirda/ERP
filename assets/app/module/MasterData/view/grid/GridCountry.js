Ext.define('ERPh.module.MasterData.view.grid.GridCountry',{
	extend 		: 'Ext.grid.Panel',
	store 		: 'ERPh.module.MasterData.store.Country',
	title 		: 'List of Country',
	alias 		: 'widget.gridcountry',
	id 			: 'gridcountry',
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
			store 	: 'ERPh.module.MasterData.store.Country',
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
			dataIndex	: 'code',
			width 		: '10%'
		},
		{
			text 		: 'Name',
			dataIndex 	: 'name',
			width 		: '60%'
		},
		{
			text 		: 'Phonecode',
			dataIndex 	: 'phonecode',
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