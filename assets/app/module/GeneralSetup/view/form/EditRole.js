Ext.define('ERPh.module.GeneralSetup.view.form.EditRole', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.editrole',
    id      : 'editrole',
    layout  : 'fit',
    modal   : true,
    title   : 'Edit Role',
    autoShow: true,
    height  : 350,
    width   : 500,
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype       : 'form',
                border      : false,
                bodyPadding : 5,
                items: [
                    {
                        xtype       : 'textfield',
                        name        : 'id',
                        fieldLabel  : 'ID',
                        anchor      : '100%',
                        hidden      : true
                    },{
                        xtype       : 'textfield',
                        name        : 'name',
                        fieldLabel  : 'Nama',
                        anchor      : '100%'
                    },{
                        xtype       : 'checkbox',
                        name        : 'isactive',
                        fieldLabel  : 'Aktif',
                        anchor      : '100%',
                        inputValue   : 'isactive'
                    },{
                        xtype       : 'htmleditor',
                        name        : 'description',
                        fieldLabel  : 'Keterangan',
                        labelWidth  : 77
                    }
                ]
            }
        ];
        me.buttons = [
            {
                text    : 'Edit',
                xtype   : 'button',
                iconCls : 'icon-disk',
                action  : 'update',
                disabled: updateRole
            }
        ];
        me.callParent(arguments);
    }
});