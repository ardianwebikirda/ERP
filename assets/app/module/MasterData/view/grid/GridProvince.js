Ext.define('ERPh.module.MasterData.view.grid.GridProvince',{
	extend 		: 'Ext.grid.Panel',
	store 		: 'ERPh.module.MasterData.store.Province',
	title 		: 'List of Province',
	alias 		: 'widget.gridprovince',
	id 			: 'gridprovince',
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
			store 	: 'ERPh.module.MasterData.store.Province',
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
			text 		: 'Country',
			dataIndex	: 'namecountry',
			width 		: '25%'
		},
		{
			text 		: 'Code',
			dataIndex	: 'code',
			width 		: '15%'
		},
		{
			text 		: 'Name',
			dataIndex 	: 'name',
			width 		: '40%'
		},
		{
			text 		: 'Code Area',
			dataIndex 	: 'codearea',
			width 		: '10%'
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