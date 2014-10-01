Ext.define('ERPh.module.MasterHR.view.form.FormOfficeHour',{
	extend 		: 'Ext.form.Panel',
	title 		: 'Form OfficeHour',
	alias 		: 'widget.formofficehour',
	id 			: 'formofficehour',
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
			fieldLabel 	: 'Name',
			anchor 		: '100%'
		},
		{
			xtype 		: 'timefield',
			name 		: 'time_in',
			fieldLabel 	: 'Time IN',
	        format      : 'H:i',
	        increment   : 30,
	        minValue    : '05:00 AM',
	        maxValue    : '11:00 PM',
	        formatValue : 'H:i:s',
			anchor 		: '100%'
		},
		{
			xtype 		: 'timefield',
			name 		: 'time_out',
			fieldLabel 	: 'Time OUT',
	        format      : 'H:i',
	        increment   : 30,
	        minValue    : '05:00 AM',
	        maxValue    : '11:00 PM',
	        formatValue : 'H:i:s',
			anchor 		: '100%'
		}
	],
	tbar 		: [
		{xtype : 'button', iconCls : 'icon-disk', text : 'Save', action : 'save'},
		{xtype : 'button', iconCls : 'icon-pencil', text : 'Update', action : 'update', disabled : true},
		{xtype : 'button', iconCls : 'icon-error', text : 'Reset', action : 'reset'}
	]
});