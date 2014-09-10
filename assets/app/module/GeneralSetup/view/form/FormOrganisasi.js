Ext.define('ERPh.module.GeneralSetup.view.form.FormOrganisasi', {
    extend      : 'Ext.window.Window',
    closeable   : true,
    modal   : true,
    requires: [
        'ERPh.module.GeneralSetup.store.ViewOrganisasi',
    ],
    title       : 'Form Modul',
    alias       : 'widget.formorganisasi',
    id          : 'formorganisasi',
    width       : 600,
    height      : 400,
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
                        name        : 'value',
                        allowBlank  : true,
                        fieldLabel  : 'Kode',
                        emptyText   : 'Didepan Kode Chiled Akan Ditambah dengan Kode Parent',
                        anchor      : '100%',
                        labelWidth  : 120
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'name',
                        allowBlank  : false,
                        fieldLabel  : 'Nama Organisasi',
                        emptyText   : 'Nama Organisasi',
                        anchor      : '100%',
                        labelWidth  : 120
                    },
                    {
                        xtype       : 'combobox',
                        name        : 'parent',
                        emptyText   : 'Parent Organisasi',
                        fieldLabel  : 'Parent Organisasi',
                        autoScroll  : false,
                        store       : Ext.create('ERPh.module.GeneralSetup.store.ViewOrganisasi'),
                        displayField: 'name',
                        valueField  : 'value',
                        anchor      : '100%',
                        labelWidth  : 120
                    },
                    {
                        fieldLabel  : 'Aktif',
                        tooltip     : 'Is Active?',
                        xtype       : 'checkboxfield',
                        name        : 'isactive',
                        flex        : 1,
                        checked     : true,
                        labelWidth  : 120
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