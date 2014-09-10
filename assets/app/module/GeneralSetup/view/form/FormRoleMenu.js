Ext.define('ERPh.module.GeneralSetup.view.form.FormRoleMenu', {
    extend      : 'Ext.window.Window',
    closeable   : true,
    modal   : true,
    requires: [
        'ERPh.module.GeneralSetup.store.ViewAllMenu',
    ],
    title       : 'Form Role Menu',
    alias       : 'widget.formrolemenu',
    id          : 'formrolemenu',
    width       : 400,
    height      : 300,
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
                        name        : 'idrole',
                        allowBlank  : true,
                        fieldLabel  : 'ID',
                        emptyText   : 'ID',
                        anchor      : '50%',
                        hidden      : true
                    },
                    {
                        xtype       : 'combobox',
                        name        : 'parent',
                        emptyText   : 'Menu',
                        fieldLabel  : 'Menu',
                        autoScroll  : false,
                        store       : Ext.create('ERPh.module.GeneralSetup.store.ViewAllMenu'),
                        tpl         : Ext.create('Ext.XTemplate', '<tpl for=".">','<div class="x-boundlist-item">','{id_menu} - {name}','</div>','</tpl>'),
                        displayTpl  : Ext.create('Ext.XTemplate', '<tpl for=".">', '{id_menu} - {name}', '</tpl>'),
                        displayField: 'id_menu',
                        valueField  : 'id_menu',
                        anchor      : '100%'
                    },
                    {
                        fieldLabel  : 'Aktif',
                        tooltip     : 'Is Active?',
                        xtype       : 'checkboxfield',
                        name        : 'isactive',
                        flex        : 1,
                        checked     : true
                    }, 
                    {
                        fieldLabel  : 'Create',
                        tooltip     : 'Is Create?',
                        xtype       : 'checkboxfield',
                        name        : 'iscreate',
                        flex        : 1,
                        checked     : true
                    },
                    {
                        fieldLabel  : 'Update',
                        tooltip     : 'Is Update?',
                        xtype       : 'checkboxfield',
                        name        : 'isupdate',
                        flex        : 1,
                        checked     : true
                    },
                    {
                        fieldLabel  : 'Delete',
                        tooltip     : 'Is Delete?',
                        xtype       : 'checkboxfield',
                        name        : 'isdelete',
                        flex        : 1,
                        checked     : true
                    },
                    {
                        fieldLabel  : 'Precess',
                        tooltip     : 'Is Precess?',
                        xtype       : 'checkboxfield',
                        name        : 'isprocess',
                        flex        : 1,
                        checked     : true
                    }
                ],
            }
        ];
        me.buttons = [
            {
                text    : 'Save',
                iconCls : 'icon-disk',
                action  : 'save',
                disabled: createRole
            }
        ];
        me.callParent(arguments);
    }  
});
