Ext.define('ERPh.module.GeneralSetup.view.form.FormUsersOrganisasi', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.formusersorganisasi',
    requires: [
        'ERPh.module.GeneralSetup.store.ViewOrganisasi'
    ],
    id      : 'formusersorganisasi',
    layout  : 'fit',
    modal   : true,
    title   : 'Form Users Organisasi',
    autoShow: true,
    height  : 100,
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
                        name        : 'id_users',
                        hidden      : true
                    },{
                        xtype       : 'combobox',
                        name        : 'value',
                        emptyText   : 'Organisasi',
                        fieldLabel  : 'Organisasi',
                        autoScroll  : false,
                        store       : Ext.create('ERPh.module.GeneralSetup.store.ViewOrganisasi'),
                        displayField: 'name',
                        valueField  : 'value',
                        anchor      : '100%',
                        labelWidth  : 100
                    }
                ]
            }
        ];
        me.buttons = [
            {
                text    : 'Add Organisasi',
                xtype   : 'button',
                iconCls : 'icon-disk',
                action  : 'addusersorg',
                disabled: createUsers
            }
        ];
        me.callParent(arguments);
    }
});