Ext.define('ERPh.module.MasterData.view.form.FormEducation',{
	extend 		: 'Ext.form.Panel',
	title 		: 'Form Education',
	alias 		: 'widget.formeducation',
	id 			: 'formeducation',
	frame 		: true,
	bodyStyle 	: 'padding: 3px',
	margins 	: '0px 0px 5px 0px',
	items 		: [
		{
			xtype 	: 'hidden',
			name 	: 'id'
		},
		{
			xtype 		: 'textfield',
			name 		: 'name',
			fieldLabel 	: 'Education Name',
			anchor 		: '100%'
		},
		{
			xtype 		: 'numberfield',
			name 		: 'level',
			fieldLabel 	: 'Education Level',
			anchor 		: '100%'
		}
	],
	tbar 		: [
		{xtype : 'button', iconCls : 'icon-disk', text : 'Save', action : 'save'},
		{xtype : 'button', iconCls : 'icon-pencil', text : 'Update', action : 'update', disabled : true},
		{xtype : 'button', iconCls : 'icon-error', text : 'Reset', action : 'reset'}
	]
});