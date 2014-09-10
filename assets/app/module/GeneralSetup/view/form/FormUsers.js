Ext.define('ERPh.module.GeneralSetup.view.form.FormUsers', {
    extend   : 'Ext.form.Panel',
    closeable   : true,
    modal       : true,
    title       : 'Form Users',
    // store       : 'ERPh.module.GeneralSetup.store.Users',
    requires: [
        'ERPh.module.GeneralSetup.store.ViewRole',
        'ERPh.module.GeneralSetup.store.ViewOrganisasi'
    ],
    alias       : 'widget.formusers',
    id          : 'formusers',
    layout      : 'fit',
    frame       : true,
    initComponent: function() {
        var me = this;
        me.items  = [
            {
                xtype       : 'form',
                bodyPadding : 5,
                items       : [
                    {
                        xtype       : 'textfield',
                        name        : 'name',
                        allowBlank  : true,
                        fieldLabel  : 'Name',
                        emptyText   : 'Name User',
                        anchor      : '100%',
                        labelWidth  : 85,
                        padding     : '0px 2px 0px 2px',
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'id',
                        hidden      : true,
                        fieldLabel  : 'ID',                    
                    },
                    {
                        border      : false,
                        frame       : false,
                        layout      : 'hbox',
                            items           : [
                                {
                                    xtype       : 'textfield',
                                    name        : 'firstname',
                                    allowBlank  : false,
                                    fieldLabel  : 'Nama Depan',
                                    emptyText   : 'Name Depan',
                                    anchor      : '100%',
                                    labelWidth  : 85,
                                    padding     : '0px 2px 5px 2px',
                                },
                                {
                                    xtype       : 'textfield',
                                    name        : 'lastname',
                                    allowBlank  : false,
                                    fieldLabel  : 'Nama Belakang',
                                    emptyText   : 'Name Belakang',
                                    anchor      : '100%',
                                    labelWidth  : 120,
                                    padding     : '0px 2px 5px 2px',
                                }
                            ]
                    },
                    {
                        border          : false,
                        frame           : false,
                        layout          : 'hbox',
                            items           : [
                                {
                                    xtype       : 'textfield',
                                    name        : 'username',
                                    allowBlank  : false,
                                    fieldLabel  : 'Username',
                                    emptyText   : 'Username',
                                    anchor      : '100%',
                                    labelWidth  : 85,
                                    padding     : '0px 2px 5px 2px',
                                },
                                {
                                    xtype       : 'textfield',
                                    name        : 'password',
                                    inputType   : 'password',
                                    allowBlank  : false,
                                    fieldLabel  : 'Password',
                                    emptyText   : 'Password',
                                    anchor      : '100%',
                                    labelWidth  : 120,
                                    padding     : '0px 2px 5px 2px',
                                }
                            ]
                    },
                    {
                        border          : false,
                        frame           : false,
                        layout          : 'hbox',
                            items           : [
                                {
                                    xtype       : 'textfield',
                                    name        : 'phone',
                                    fieldLabel  : 'Telephone',
                                    emptyText   : 'Telephone',
                                    anchor      : '100%',
                                    labelWidth  : 85,
                                    padding     : '0px 2px 5px 2px',
                                },
                                {
                                    xtype       : 'textfield',
                                    name        : 'mobile',
                                    fieldLabel  : 'No Handphone',
                                    emptyText   : 'No Handphone',
                                    anchor      : '100%',
                                    labelWidth  : 120,
                                    padding     : '0px 2px 5px 2px',
                                }
                            ]
                    },
                    {
                        border          : false,
                        frame           : false,
                        layout          : 'hbox',
                            items           : [
                                {
                                    xtype       : 'textfield',
                                    name        : 'email',
                                    fieldLabel  : 'Email',
                                    emptyText   : 'Email',
                                    anchor      : '100%',
                                    labelWidth  : 85,
                                    padding     : '0px 2px 5px 2px',
                                },
                                {
                                    fieldLabel  : 'Aktif',
                                    tooltip     : 'Is Active?',
                                    xtype       : 'checkboxfield',
                                    name        : 'isactive',
                                    checked     : true,
                                    labelWidth  : 120,
                                    padding     : '0px 2px 5px 2px',
                                }
                            ]
                    },
                    {
                        xtype       : 'combobox',
                        name        : 'id_role',
                        emptyText   : 'Role User',
                        fieldLabel  : 'Role User',
                        autoScroll  : false,
                        store       : Ext.create('ERPh.module.GeneralSetup.store.ViewRole'),
                        displayField: 'name',
                        valueField  : 'id_role',
                        anchor      : '100%',
                        labelWidth  : 85,
                        padding     : '0px 2px 0px 2px',
                    },
                    {
                        xtype       : 'combobox',
                        name        : 'value',
                        emptyText   : 'Organisasi',
                        fieldLabel  : 'Organisasi',
                        autoScroll  : false,
                        store       : Ext.create('ERPh.module.GeneralSetup.store.ViewOrganisasi'),
                        displayField: 'name',
                        valueField  : 'value',
                        anchor      : '100%',
                        labelWidth  : 85,
                        padding     : '0px 2px 0px 2px',
                    },
                    {
                        fieldLabel   : 'Description',
                        labelWidth  : 85,
                        padding     : '0px 2px 0px 2px',
                        width        : 600,
                        height       : 100,
                        tooltip      : 'Description',
                        xtype        : 'htmleditor',
                        name         : 'description',
                        layout       : 'fit'
                    },
                ]
            }
        ];
        me.buttons = [
            {
                text    : 'Save Add',
                iconCls : 'icon-disk',
                action  : 'save',
                disabled: createUsers
            },
            {
                text    : 'Edit Users',
                iconCls : 'icon-disk',
                action  : 'update',
                disabled: true
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