Ext.define('ERPh.module.GeneralSetup.view.form.EditMenu', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.editmenu',
    id      : 'editmenu',
    layout  : 'fit',
    modal   : true,
    requires: [
        'ERPh.module.GeneralSetup.store.ViewMenu',
    ],
    title   : 'Edit Menu',
    autoShow: true,
    height  : 500,
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
                        anchor      : '50%',
                        labelWidth  : 100,
                        readOnly    : true
                    },{
                        xtype       : 'textfield',
                        name        : 'name',
                        fieldLabel  : 'Nama',
                        anchor      : '100%',
                        labelWidth  : 100
                    },{
                        xtype       : 'textfield',
                        name        : 'icon',
                        fieldLabel  : 'Icon',
                        anchor      : '100%',
                        labelWidth  : 100
                    },{
                        xtype       : 'combobox',
                        name        : 'id_menu',
                        emptyText   : 'Parent Menu',
                        fieldLabel  : 'Parent Menu',
                        autoScroll  : false,
                        store       : Ext.create('ERPh.module.GeneralSetup.store.ViewMenu'),
                        displayField: 'name',
                        valueField  : 'id_menu',
                        anchor      : '100%',
                        labelWidth  : 100
                    },{
                        xtype       : 'checkbox',
                        name        : 'isactive',
                        fieldLabel  : 'Aktif',
                        anchor      : '100%',
                        labelWidth  : 100,
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
                disabled: updateMenu
            }
        ];
        me.callParent(arguments);
    }
});