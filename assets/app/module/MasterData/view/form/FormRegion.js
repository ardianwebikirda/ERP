Ext.define('ERPh.module.MasterData.view.form.FormRegion',{
	extend 		: 'Ext.form.Panel',
	title 		: 'Form Region',
	alias 		: 'widget.formregion',
	id 			: 'formregion',
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
			name 			: 'id_province',
			fieldLabel 		: 'Province',
			store 			: Ext.create('ERPh.module.MasterData.store.MinProvince'),
			displayField	: 'nameprovince',
			valueField		: 'id',
			anchor 			: '100%'
		},
		{
			xtype 		: 'textfield',
			name 		: 'code',
			fieldLabel	: 'Code Region',
			anchor 		: '100%'
		},
		{
			xtype 		: 'textfield',
			name 		: 'name',
			fieldLabel 	: 'Region Name',
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