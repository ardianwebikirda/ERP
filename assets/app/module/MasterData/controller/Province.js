Ext.define('ERPh.module.MasterData.controller.Province',{
	extend 			: 'Ext.app.Controller',
	CheckedDataEdit	: [],

	init: function() {
        var me = this;
        me.getStore('ERPh.module.MasterData.store.Province').load();
        me.control({
            "gridprovince  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridprovince"                                 : {
               itemclick: me.viewProvince
            },            
            "formprovince  button[action=save]"        : {
                click: me.save
            }, 
            "formprovince  button[action=reset]"       : {
                click: me.reset
            },
            "gridprovince"                          : {
               itemdblclick: me.addorg
            },
            "gridprovince textfield[action=search]"    : {
               keypress: me.search
            },
            "gridprovince button[action=print]"        : {
               click: me.print
            },
            "formprovince button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    
    reloadStore: function(){
        var me = this;
        me.getStore('ERPh.module.MasterData.store.Province').reload();
    },

    viewProvince: function(grid, record, item, index, e, eOpts){
        this.getStore('ERPh.module.MasterData.store.MinCountry').reload();
        this.getStore('ERPh.module.MasterData.store.Province').reload();
        var id      = record.data.id;
        var form    = Ext.getCmp('formprovince');
        var grid    = Ext.getCmp('gridprovince');
        form.getForm().setValues(record.data);

        // console.log(record.data);

        var saveButton      = form.down('button[action=save]');
        var updateButton    = form.down('button[action=update]');
        saveButton.setDisabled(true);
        updateButton.setDisabled(false);
    },

    del: function(gridPanel, selected){
        var me = this;
        me.CheckedDataEdit = new Array();
        var record = gridPanel.up('grid').getSelectionModel().getSelection();
        Ext.each(record, function(selected){
            me.CheckedDataEdit.push({
                id : selected.data.id
            });
        }); 

        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan menghapus data yang terseleksi?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url             : BASE_URL + 'MasterData/c_province/delProvince',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.msg);
                            if(data.msg === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Digunakan di Table Lain',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });                             
                            } else {
                            me.reset();
                            var storeApproval = Ext.getStore('ERPh.module.MasterData.store.Province');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                            }
                        }
                    });
                }
            }
        })
    },

    reset: function(btn) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formprovince');
        var grid = Ext.getCmp('gridprovince');
        form.getForm().reset();

        if(createProvince == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        me.getStore('ERPh.module.MasterData.store.Province').reload();
    },

    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var id_country   = form.findField('id_country').getValue();
        var code        = form.findField('code').getValue();
        var name        = form.findField('name').getValue();
        var codearea    = form.findField('codearea').getValue();

        console.log(id_country, name);

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterData/c_province/saveProvince',
            method  : 'POST',
            params  : {
                id_country  : id_country,
                code        : code,
                name        : name,
                codearea    : codearea
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    me.reset();
                    me.getStore('ERPh.module.MasterData.store.Province').removeAll();
                    me.getStore('ERPh.module.MasterData.store.Province').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Province Telah Terdaftar - Silahkan Gunakan Province Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                } else {
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'ID has indexed, Please Contact Your Vendor..!',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });                   
                }
            }
        });   
    },

    update: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var id          = form.findField('id').getValue();
        var id_country  = form.findField('id_country').getValue();
        var code        = form.findField('code').getValue();
        var name        = form.findField('name').getValue();
        var codearea    = form.findField('codearea').getValue();
        
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'MasterData/c_province/editProvince',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            id_country  : id_country,
                            code        : code,
                            name        : name,
                            codearea    : codearea
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.total);
                            if(data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Telah Dirubah',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                me.reset();
                                me.getStore('ERPh.module.MasterData.store.Province').removeAll();
                                me.getStore('ERPh.module.MasterData.store.Province').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Province Telah Terdaftar - Silahkan Gunakan Province Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                            } else {
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Pengisian Data Salah',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });                   
                            }
                        }
                    });
                }
            }
        });      
    },

    search: function(field, evt, opts){
        var value       = field.getValue();
            Ext.Ajax.request({
                url     : BASE_URL + 'MasterData/c_province/searchProvince',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('ERPh.module.MasterData.store.Province');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'MasterData/c_province/printProvince/';
    },
});