Ext.define('ERPh.module.Profile.controller.Employee',{
	extend 			: 'Ext.app.Controller',
	CheckedDataEdit	: [],

	 init: function() {
        var me = this;
        me.getStore('ERPh.module.Profile.store.Employee').load();
        me.control({
            "gridemployee"                          : {
               itemdblclick: me.edit
            },
            "gridemployee  button[action=add]"       : {
                click: me.add
            }, 
            "gridemployee  button[action=delete]"    : {
                click: me.del
            },  
            "gridemployee textfield[action=search]"  : {
               keypress: me.search
            },
            "gridemployee button[action=print]"      : {
               click: me.print
            }, 
            "formemployee  button[action=save]"      : {
                click: me.save
            },
            "formeditemployee button[action=update]"     : {
               click: me.update
            }, 
            "formemployee  button[action=reset]"     : {
                click: me.reset
            },
            "formemployee #id_country"               : {
                select: me.loadComboProvince
            },
            "formemployee #id_province"              : {
                select: me.loadComboRegion
            },
            "formemployee  #id_jobtitle"     : {
                keypress: me.cariJT
            },
            "griddepartment2"    : {
                itemdblclick: me.addDepartment2
            }, 
            "griddepartment2  button[action=delete]" : {
                click: me.delDept
            },
            "formdepartment2 button[action=saveDept]"   : {
                click: me.saveDept
            } 
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('ERPh.module.Profile.store.Employee').reload();
    },
    add: function(){
        var me = this;
        me.getStore('ERPh.module.MasterData.store.AllRegion').reload();
        Ext.create('ERPh.module.Profile.view.form.FormEmployee').show();
    },

    del: function(gridPanel, selected){
        var me = this;
        me.CheckedDataEdit = new Array();
        var record = gridPanel.up('grid').getSelectionModel().getSelection();
        Ext.each(record, function(selected){
            me.CheckedDataEdit.push({
                id  : selected.data.id
            });
        });  
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan menghapus data yang terseleksi?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url             : BASE_URL + 'Profile/c_employee/delEmployee',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data);
                            me.reset();
                            var storeApproval = Ext.getStore('ERPh.module.Profile.store.Employee');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                        }
                    });
                }
            }
        });
    },
    search: function(field, evt, opts){
        var value       = field.getValue();
            Ext.Ajax.request({
                url     : BASE_URL + 'Profile/c_employee/searchEmployee',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('ERPh.module.Profile.store.Employee');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },
    print : function(){
        window.location = BASE_URL + 'Profile/c_employee/printEmployee/';
    },
    save: function(btn, evt, opts){
        var me              = this;
        var form            = btn.up('form').getForm();
        var fname           = form.findField('fname').getValue();
        var lname           = form.findField('lname').getValue();
        var username        = form.findField('username').getValue();
        var gender          = form.findField('gender').getValue();
        var religion        = form.findField('id_religion').getValue();
        var bod_place       = form.findField('bod_place').getValue();
        var bod             = form.findField('bod').getValue();
        var marital_status  = form.findField('marital_status').getValue();
        var noc             = form.findField('noc').getValue();
        var id_education    = form.findField('id_education').getValue();
        var id_officehour   = form.findField('id_officehour').getValue();
        var blood           = form.findField('blood').getValue();
        var photo           = form.findField('photo').getValue();
        var address         = form.findField('address').getValue();
        var id_country      = form.findField('id_country').getValue();
        var id_province     = form.findField('id_province').getValue();
        var id_region       = form.findField('id_region').getValue();
        var zip             = form.findField('zip').getValue();
        var code            = form.findField('code').getValue();
        var id_company      = form.findField('id_company').getValue();
        var id_department   = form.findField('id_department').getValue();
        var id_jobtitle     = form.findField('id_jobtitle').getValue();
        var id_jobstatus    = form.findField('id_jobstatus').getValue();
        var hire            = form.findField('hire').getValue();
        var expired         = form.findField('expired').getValue();
        var supervisor      = form.findField('supervisor').getValue();
        var phone           = form.findField('phone').getValue();
        var mobile1         = form.findField('mobile1').getValue();
        var mobile2         = form.findField('mobile2').getValue();
        var email1          = form.findField('email1').getValue();
        var email2          = form.findField('email2').getValue();
        var id_bank         = form.findField('id_bank').getValue();
        var bank_account    = form.findField('bank_account').getValue();
        var idcard_type     = form.findField('idcard_type').getValue();
        var idcard_number   = form.findField('idcard_number').getValue();
        var tax             = form.findField('tax').getValue();
        var isactive        = form.findField('isactive').getValue();
        var isovertime      = form.findField('isovertime').getValue();
        var isresign        = form.findField('isresign').getValue();
        // console.log('hai');
        console.log(zip, code);
        Ext.Ajax.request({
            url     : BASE_URL + 'Profile/c_employee/saveEmployee',
            method  : 'POST',
            params  : {
                fname           : fname,
                lname           : lname,
                username        : username,
                gender          : gender,
                religion        : religion,
                bod_place       : bod_place,
                bod             : bod,
                marital_status  : marital_status,
                noc             : noc,
                id_education    : id_education,
                id_officehour   : id_officehour,
                blood           : blood,
                photo           : photo,
                address         : address,
                id_country      : id_country,
                id_province     : id_province,
                id_region       : id_region,
                zip             : zip,
                code            : code,
                id_company      : id_company,
                id_department   : id_department,
                id_jobtitle     : id_jobtitle,
                id_jobstatus    : id_jobstatus,
                hire            : hire,
                expired         : expired,
                supervisor      : supervisor,
                phone           : phone,
                mobile1         : mobile1,
                mobile2         : mobile2,
                email1          : email1,
                email2          : email2,
                id_bank         : id_bank,
                bank_account    : bank_account,
                idcard_type     : idcard_type,
                idcard_number   : idcard_number,
                tax             : tax,
                isactive        : isactive,
                isovertime      : isovertime,
                isresign        : isresign
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
                    win.close();
                    me.reset();
                    me.getStore('ERPh.module.Profile.store.Employee').removeAll();
                    me.getStore('ERPh.module.Profile.store.Employee').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Employee Telah Terdaftar - Silahkan Gunakan Employee Lain',
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
    },

    edit: function(grid, record, item, index, e, eOpts){
        // this.getStore('ERPh.module.MasterData.store.MinRegion').load();
        this.getStore('ERPh.module.Profile.store.Employee').reload();
        this.getStore('ERPh.module.Profile.store.Company').reload();
        this.getStore('ERPh.module.Profile.store.Department').reload();
        this.getStore('ERPh.module.Profile.store.JobTitle').reload();
        this.getStore('ERPh.module.Profile.store.JobStatus').reload();
        this.getStore('ERPh.module.Profile.store.OfficeHour').reload();
        this.getStore('ERPh.module.MasterData.store.MinCountry').reload();
        this.getStore('ERPh.module.MasterData.store.MinProvince').reload();
        this.getStore('ERPh.module.MasterData.store.Education').reload();
        this.getStore('ERPh.module.MasterData.store.Bank').reload();
        var win = Ext.create('ERPh.module.Profile.view.form.FormEditEmployee');
        win.show();
        win.down('form').loadRecord(record);
    },

    update: function(btn){
        var me              = this;
        var win             = btn.up('window');
        var form            = win.down('form').getForm();
        var id              = form.findField('id').getValue();
        var fname           = form.findField('fname').getValue();
        var lname           = form.findField('lname').getValue();
        var username        = form.findField('username').getValue();
        var gender          = form.findField('gender').getValue();
        var religion        = form.findField('id_religion').getValue();
        var bod_place       = form.findField('bod_place').getValue();
        var bod             = form.findField('bod').getValue();
        var marital_status  = form.findField('marital_status').getValue();
        var noc             = form.findField('noc').getValue();
        var id_education    = form.findField('id_education').getValue();
        var id_officehour   = form.findField('id_officehour').getValue();
        var blood           = form.findField('blood').getValue();
        var photo           = form.findField('photo').getValue();
        var address         = form.findField('address').getValue();
        var id_country      = form.findField('id_country').getValue();
        var id_province     = form.findField('id_province').getValue();
        var id_region       = form.findField('id_region').getValue();
        var zip             = form.findField('zip').getValue();
        var code            = form.findField('code').getValue();
        var id_company      = form.findField('id_company').getValue();
        var id_department   = form.findField('id_department').getValue();
        var id_jobtitle     = form.findField('id_jobtitle').getValue();
        var id_jobstatus    = form.findField('id_jobstatus').getValue();
        var hire            = form.findField('hire').getValue();
        var expired         = form.findField('expired').getValue();
        var supervisor      = form.findField('supervisor').getValue();
        var phone           = form.findField('phone').getValue();
        var mobile1         = form.findField('mobile1').getValue();
        var mobile2         = form.findField('mobile2').getValue();
        var email1          = form.findField('email1').getValue();
        var email2          = form.findField('email2').getValue();
        var id_bank         = form.findField('id_bank').getValue();
        var bank_account    = form.findField('bank_account').getValue();
        var idcard_type     = form.findField('idcard_type').getValue();
        var idcard_number   = form.findField('idcard_number').getValue();
        var tax             = form.findField('tax').getValue();
        var isactive        = form.findField('isactive').getValue();
        var isovertime      = form.findField('isovertime').getValue();
        var isresign        = form.findField('isresign').getValue();
        console.log('bank:',id_bank, ' | Shift:',id_officehour, ' |jobstat:',id_jobstatus, ' |jobtit:',id_jobtitle, ' |Comp:',id_company, 
            ' |dept:',id_department, ' |Count:',id_country, ' |prov:',id_province, ' |reg:',id_region);
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'Profile/c_employee/editEmployee',
                        method  : 'POST',
                        params  : {
                            id              : id,
                            fname           : fname,
                            lname           : lname,
                            username        : username,
                            gender          : gender,
                            religion        : religion,
                            bod_place       : bod_place,
                            bod             : bod,
                            marital_status  : marital_status,
                            noc             : noc,
                            id_education    : id_education,
                            id_officehour   : id_officehour,
                            blood           : blood,
                            photo           : photo,
                            address         : address,
                            id_country      : id_country,
                            id_province     : id_province,
                            id_region       : id_region,
                            zip             : zip,
                            code            : code,
                            id_company      : id_company,
                            id_department   : id_department,
                            id_jobtitle     : id_jobtitle,
                            id_jobstatus    : id_jobstatus,
                            hire            : hire,
                            expired         : expired,
                            supervisor      : supervisor,
                            phone           : phone,
                            mobile1         : mobile1,
                            mobile2         : mobile2,
                            email1          : email1,
                            email2          : email2,
                            id_bank         : id_bank,
                            bank_account    : bank_account,
                            idcard_type     : idcard_type,
                            idcard_number   : idcard_number,
                            tax             : tax,
                            isactive        : isactive,
                            isovertime      : isovertime,
                            isresign        : isresign
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
                                win.close();
                                me.getStore('ERPh.module.Profile.store.Employee').removeAll();
                                me.getStore('ERPh.module.Profile.store.Employee').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Employee Telah Terdaftar - Silahkan Gunakan Employee Lain',
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
    reset: function(btn) {//Reset Form
        var form        = Ext.getCmp('formemployee');
        var grid        = Ext.getCmp('griddepartment2');
        form.getForm().reset();

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(false);

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);

        var me = this;
        me.getStore('ERPh.module.Profile.store.Employee').reload();
        me.getStore('ERPh.module.Profile.store.Department2').reload();
    },
    addDepartment2: function(grid, record, item, index, e, eOpts){
        if(record.data.id_employee ===''||record.data.id_employee === null){
             Ext.MessageBox.show({
                title           : 'Error',
                msg             : 'Pilih Employee Terlebih Dahulu',
                icon            : Ext.MessageBox.ERROR,
                buttons         : Ext.MessageBox.OK
            });  
         } else {
            // this.getStore('ERPh.module.Profile.store.Employee').load();
            var win = Ext.create('ERPh.module.Profile.view.form.FormDepartment2');
            win.show();
            win.down('form').loadRecord(record);
        }
    },
    saveDept: function(btn, evt, opts){
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var fname       = form.findField('fname').getForm();
        var lname       = form.findField('lname').getForm(); 
        var id_comp     = form.findField('id_company').getValue();
        var id_dept     = form.findField('id_department').getValue();
        var isactive    = form.findField('isactive').getValue();

        console.log(id_comp);

        Ext.Ajax.request({
            url     : BASE_URL + 'Profile/c_employee/saveDepartment2',
            method  : 'POST',
            params  : {
                id_dept     : id_dept,
                id_comp     : id_comp,
                isactive    : isactive
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
                    win.close();
                    me.getStore('ERPh.module.Profile.store.Employee').reload();
                    me.getStore('ERPh.module.Profile.store.Department2').reload();
                    me.reset();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Department Telah Terdaftar - Silahkan Gunakan Department Lain',
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

    delDept: function(gridPanel, selected){
        var me = this;
        me.CheckedDataEdit = new Array();
        var record = gridPanel.up('grid').getSelectionModel().getSelection();
        Ext.each(record, function(selected){
            me.CheckedDataEdit.push({
                id  : selected.data.id
            });
        });  
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan menghapus data yang terseleksi?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url             : BASE_URL + 'Profile/c_employee/delDepartment',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            me.reset();
                            var storeApproval = Ext.getStore('ERPh.module.Profile.store.Department2');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                        }
                    });
                }
            }
        });
    },

    loadComboProvince : function(combo, records){
        var comboProvince = Ext.ComponentQuery.query('formemployee #id_province')[0];
        comboProvince.setDisabled(true);
        comboProvince.setValue('');
        comboProvince.store.removeAll();


        // var comboCountry    = Ext.ComponentQuery.query('formemployee #id_country')[0];
        // var countryId       = comboCountry.getValue();
        // console.log(countryId);
        // comboProvince.store.load({
        //     params  : { countryId : countryId }
        // });
        var product     = records[0].data.id;
        var form        = Ext.getCmp('formemployee').getForm();
        var countryId   = form.findField('id_country').getValue();
        if(countryId != '' && product != ''){
            Ext.Ajax.request({
                url     : BASE_URL + 'MasterData/c_province/filterProvince',
                method  : 'POST',
                params  : {
                    product         : product,
                    countryId       : countryId
                }
            });
        }
        comboProvince.setDisabled(false);
    },

    loadComboRegion : function(combo, records){
        var comboRegion = Ext.ComponentQuery.query('formemployee #id_region')[0];
        comboRegion.setDisabled(true);
        comboRegion.setValue('');
        comboRegion.store.removeAll();

        var comboProvince   = Ext.ComponentQuery.query('formemployee #id_province')[0];
        provinceId          = comboProvince.getValue();
        console.log(provinceId);
        comboRegion.store.load({
            params  : { provinceId : provinceId }
        });
        comboRegion.setDisabled(false);
    },

    loadProvince : function(combo, records, index){
        var product     = records[0].data.id;
        var form        = Ext.getCmp('formemployee').getForm();
        var countryId   = form.findField('id_country').getValue();
        if(countryId != '' && product != ''){
            Ext.Ajax.request({
                url     : BASE_URL + 'MasterData/c_province/filterProvince',
                method  : 'POST',
                params  : {
                    product         : product,
                    countryId       : countryId
                }
            });
        }
    }
});