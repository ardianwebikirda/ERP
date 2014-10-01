Ext.define('ERPh.module.MasterHR.view.form.FormJobTitle',{
	extend 		: 'Ext.form.Panel',
	title 		: 'Form Job Title',
	alias 		: 'widget.formjobtitle',
	id 			: 'formjobtitle',
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
			name 			: 'id_joblevel',
			fieldLabel 		: 'Job Level',
			store 			: Ext.create('ERPh.module.MasterHR.store.MinJobLevel'),
			displayField	: 'namejoblevel',
			valueField		: 'id',
			anchor 			: '100%'
		},
		{
			xtype 		: 'textfield',
			name 		: 'name',
			fieldLabel	: 'Job Title',
			anchor 		: '100%'
		}
	],
	tbar 		: [
		{xtype : 'button', iconCls : 'icon-disk', text : 'Save', action : 'save'},
		{xtype : 'button', iconCls : 'icon-pencil', text : 'Update', action : 'update', disabled : true},
		{xtype : 'button', iconCls : 'icon-error', text : 'Reset', action : 'reset'}
	]
});