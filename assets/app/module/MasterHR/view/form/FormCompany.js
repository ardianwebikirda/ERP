Ext.define('ERPh.module.MasterHR.view.form.FormCompany', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.formcompany',
    store       : 'ERPh.module.MasterHR.store.Company',
    id          : 'formcompany',
    layout      : 'form',
    frame    : true,   
    bodyStyle   : 'padding: 3px',
    margins     : '0px 0px 5px 0px',
    items       : [
    	{
    		xtype 	: 'hidden',
    		name 	: 'id',
    		value	: 0
    	},
    	{
    		xtype         : 'textfield',
    		name          : 'code',
    		allowBlank    : true,
    		fieldLabel    : 'Company Code',
    	},
    	{
    		xtype         : 'textfield',
    		name          : 'name',
    		allowBlank    : false,
    		fieldLabel    : 'Company Name'
    	}
    ],
     tbar    : [
        {
            text    : 'Save',
            iconCls : 'icon-disk',
            action  : 'save'//Nantinya akan dicontrol menggunakan controller
        },
        {
            text    : 'Update',
            iconCls : 'icon-pencil',
            action  : 'update',//Nantinya akan dicontrol menggunakan controller
            disabled    : true
 
        },
        {
            text    : 'Reset',
            iconCls : 'icon-error',
            action  : 'reset'
        }
    ]
});