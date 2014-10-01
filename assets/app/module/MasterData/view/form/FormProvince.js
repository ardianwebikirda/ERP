Ext.define('ERPh.module.MasterData.view.form.FormProvince',{
	extend 		: 'Ext.form.Panel',
	title 		: 'Form Province',
	alias 		: 'widget.formprovince',
	id 			: 'formprovince',
	frame 		: true,
	bodyStyle 	: 'padding: 3px',
	margins 	: '0px 0px 5px 0px',
	items 		: [
		{
			xtype 	: 'hidden',
			name 	: 'id'
		},
		{
			xtype 			: 'combobox',
			name 			: 'id_country',
			fieldLabel 		: 'Country',
			store 			: Ext.create('ERPh.module.MasterData.store.MinCountry'),
			displayField	: 'namecountry',
			valueField		: 'id',
			anchor 			: '100%'
		},
		{
			xtype 		: 'textfield',
			name 		: 'code',
			fieldLabel	: 'Code Province',
			anchor 		: '100%'
		},
		{
			xtype 		: 'textfield',
			name 		: 'name',
			fieldLabel 	: 'Province Name',
			anchor 		: '100%'
		},
		{
			xtype 		: 'textfield',
			name 		: 'codearea',
			fieldLabel 	: 'Code Area',
			anchor 		: '100%'
		}
	],
	tbar 		: [
		{xtype : 'button', iconCls : 'icon-disk', text : 'Save', action : 'save'},
		{xtype : 'button', iconCls : 'icon-pencil', text : 'Update', action : 'update', disabled : true},
		{xtype : 'button', iconCls : 'icon-error', text : 'Reset', action : 'reset'}
	]
});