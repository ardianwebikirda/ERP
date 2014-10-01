Ext.define('ERPh.module.GeneralSetup.view.form.FormRole', {
    extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
    title       : 'Form Role',
    alias       : 'widget.formrole',
    id          : 'formrole',
    width       : 550,
    height      : 450,
    bodyStyle   : 'padding: 4px',
    margins     :'3px 3px 3px 3px',
    layout      : 'fit',
    border      : false,
    frame       : true,
    initComponent: function() {
        var me = this;
        me.items  = [
            {
                xtype           : 'form',
                border          : false,
                frame           : true,
                bodyPadding     : 5,
                items       : [
                    {
                        xtype       : 'textfield',
                        name        : 'name',
                        allowBlank  : false,
                        fieldLabel  : 'Nama Role',
                        emptyText   : 'Nama Role',
                        anchor      : '100%'
                    },
                    {
                        fieldLabel  : 'Aktif',
                        tooltip     : 'Is Active?',
                        xtype       : 'checkboxfield',
                        name        : 'isactive',
                        flex        : 1,
                        checked     : true
                    },                    {
                       fieldLabel   : 'Description',
                       labelWidth   : 77,
                       tooltip      : 'Description',
                       xtype        : 'htmleditor',
                       name         : 'description'
                    }
                ],
            }
        ];
        me.buttons = [
            {
                text    : 'Save',
                iconCls : 'icon-disk',
                action  : 'save'
            },
            {
                text    : 'Reset',
                iconCls : 'icon-error',
                action  : 'reset'
            }
        ];
        me.callParent(arguments);
    }  
});
