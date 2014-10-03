Ext.define('ERPh.module.MasterHR.view.form.FormDepartment2',{
	extend 		: 'Ext.window.Window',
	requires	: ['ERPh.module.MasterHR.store.ViewDepartment'],
	alias 		: 'widget.formdepartment2',
	id 			: 'formdepartment2',
	// layout 		: 'fit',
	title 		: 'Form Department',
	modal 		: true,
	autoShow 	: true,
	height 		: 105,
	width 		: 600,
	initComponent: function(){
		var me 		= this;
		me.items 	= [
			{
				xtype 		: 'form',
				border 		: false,
				frame 		: true,
				bodyPadding : 5,
				items 		: [
					{
						xtype 	: 'textfield',
						name 	: 'id_company',
						hidden 	: true					
					},
					{
						xtype 			: 'combobox',
						name 			: 'name',
						fieldLabel		: 'Department',
						store 			: Ext.create('ERPh.module.MasterHR.store.ViewDepartment'),
						displayField	: 'namedepartment',
						valueField 		: 'id',
						anchor 			: '100%'					
					}
				]
			}
		];
		me.buttons 	= [
			 {
                text    : 'Add Department',
                xtype   : 'button',
                iconCls : 'icon-disk',
                action  : 'saveDept'
            }
		];
        me.callParent(arguments);
	}
});