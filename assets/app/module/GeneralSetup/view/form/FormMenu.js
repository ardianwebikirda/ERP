Ext.define('ERPh.module.GeneralSetup.view.form.FormMenu', {
    extend      : 'Ext.window.Window',
    closeable   : true,
    modal   : true,
    requires: [
        'ERPh.module.GeneralSetup.store.ViewMenu',
    ],
    title       : 'Form Modul',
    alias       : 'widget.formmenu',
    id          : 'formmenu',
    width       : 550,
    height      : 450,
    bodyStyle   : 'padding: 7px',
    margins     :'5px 5px 5px 5px',
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
                        name        : 'id',
                        allowBlank  : true,
                        fieldLabel  : 'ID',
                        emptyText   : 'ID',
                        anchor      : '50%',
                        labelWidth  : 100
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'name',
                        allowBlank  : false,
                        fieldLabel  : 'Nama Modul',
                        emptyText   : 'Nama Modul',
                        anchor      : '100%',
                        labelWidth  : 100
                    },
                    {
                        xtype       : 'combobox',
                        name        : 'parent',
                        emptyText   : 'Parent Modul',
                        fieldLabel  : 'Parent Modul',
                        autoScroll  : false,
                        store       : Ext.create('ERPh.module.GeneralSetup.store.ViewMenu'),
                        displayField: 'name',
                        valueField  : 'id_menu',
                        anchor      : '100%',
                        labelWidth  : 100
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'icon',
                        allowBlank  : false,
                        fieldLabel  : 'Icon Modul',
                        emptyText   : 'Icon Modul',
                        anchor      : '100%',
                        labelWidth  : 100
                    },
                    {
                        fieldLabel  : 'Aktif',
                        tooltip     : 'Is Active?',
                        xtype       : 'checkboxfield',
                        name        : 'isactive',
                        flex        : 1,
                        checked     : true,
                        anchor      : '100%',
                        labelWidth  : 100
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
