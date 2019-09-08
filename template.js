var app = angular.module('templateApp', ['ui.utils']);

// from http://stackoverflow.com/questions/15242592/angular-js-how-to-autocapitalize-an-input-field
app.directive('capitalize', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      var capitalize = function(inputValue) {
        var capitalized = inputValue.toUpperCase();
        if (capitalized !== inputValue) {
          modelCtrl.$setViewValue(capitalized);
          modelCtrl.$render();
        }
        return capitalized;
      };
      modelCtrl.$parsers.push(capitalize);
      capitalize(scope[attrs.ngModel]); // capitalize initial value
    }
  };
});

app.controller('PanelController', function() {
  this.tab = 1;

  this.selectTab = function(setTab) {
    this.tab = setTab;
  };

  this.isSelected = function(checkTab) {
    return this.tab === checkTab;
  };
});

app.controller('DataController', ['$scope', function($scope) {
    this.tab = 1;

    this.selectTab = function(setTab) {
      this.tab = setTab;
    };

    this.isSelected = function(checkTab) {
      return this.tab === checkTab;
    };

    $scope.whs = {whs_country: "", whs_city: "", whs_code: "",
        length_unit: "-", weight_unit: "-", volume_unit: "-",
        def_copies: null, init_number: null,
        def_rec_loc: null, def_unl_loc: null, whs_timezone: "-",
        bus_unit: "", locality: "", postcode: "", add_1: "", add_2: "", add_3: "",
        phone_num: "", fax_num: "", truckdock: "-", sec_sys: "-", iata: "",
        loc_lang: "-", boxid: "-", outbound: "-", autoreceive: "-", def_loc: null, 
        hb_label: "-", cus_clear: "-"};
 
    // LOCATIONS UX
    $scope.whs_loc_array = [{
      loc_code: "",
      loc_desc: "",
      scan_avail: "-",
      loc_group: "",
      tdkareacode: null
    }];

    $scope.loc_dupl = [];

    $scope.check = function(input) {  
        var count = [];

        var a = 0; do {
            count[a] = 0; // init
            
            var b = 0; do {
                if((input[a].loc_code === input[b].loc_code)&&(a !== b)) {
                    count[a]++; // add if duplicate
                }
                b++;
            } while (b < input.length);

            if(count[a] === 0) 
                $scope.loc_dupl[a] = 'NO';
            else 
                $scope.loc_dupl[a] = 'YES';
            a++;
        } while (a < input.length);
    };   
    
    $scope.check($scope.whs_loc_array);
    
    $scope.new_loc = function(index) {
      $scope.whs_loc_array.splice(index + 1, 0, {
        loc_code: "",
        loc_desc: "",
        scan_avail: "-",
        loc_group: "",
        tdkareacode: null
      });
      
      $scope.check($scope.whs_loc_array);
    };

    $scope.cop_loc = function(index) {
      $scope.whs_loc_array.splice(index + 1, 0, {
        loc_code: $scope.whs_loc_array[index].loc_code,
        loc_desc: $scope.whs_loc_array[index].loc_desc,
        scan_avail: $scope.whs_loc_array[index].scan_avail,
        loc_group: $scope.whs_loc_array[index].loc_group,
        tdkareacode: $scope.whs_loc_array[index].tdkareacode
      });
      
      $scope.check($scope.whs_loc_array);
    };

    $scope.rem_loc = function(index) {
      if ($scope.whs_loc_array.length > 1)
          $scope.whs_loc_array.splice(index, 1);
      $scope.check($scope.whs_loc_array);
    };

    // PRINTERS TAB UX
    $scope.label_printers = [{
      qtype: "-",
      ip: "",
      onhand: false,
      masterbill: false,
      housebill: false,
      delivery: false,
      format: "-",
      description: ""
    }];

    $scope.new_prn = function(index) {
      $scope.label_printers.splice(index + 1, 0, {
        qtype: "-",
        ip: "",
        onhand: false,
        masterbill: false,
        housebill: false,
        delivery: false,
        format: "-",
        description: ""
      });
  };

    $scope.cop_prn = function(index) {
      $scope.label_printers.splice(index + 1, 0, {
        qtype: $scope.label_printers[index].qtype,
        ip: $scope.label_printers[index].ip,
        onhand: $scope.label_printers[index].onhand,
        masterbill: $scope.label_printers[index].masterbill,
        housebill: $scope.label_printers[index].housebill,
        delivery: $scope.label_printers[index].delivery,
        format: $scope.label_printers[index].format,
        description: $scope.label_printers[index].description
      });
    };

    $scope.rem_prn = function(index) {
      if ($scope.label_printers.length > 1) $scope.label_printers.splice(index, 1);
    };

    // USERS TAB UX
    $scope.users = [{
      fname: "",
      mname: "",
      lname: "",
      ldap: "",
      role: "",
      category: "-",
      lang: "-",
      email: ""
    }];

    $scope.new_usr = function(index) {
      $scope.users.splice(index + 1, 0, {
          fname: "",
          mname: "",
          lname: "",
          ldap: "",
          role: "",
          category: "-",
          lang: "-",
          email: ""
      });
    };

    $scope.cop_usr = function(index) {
      $scope.users.splice(index + 1, 0, {
          fname: $scope.users[index].fname,
          mname: $scope.users[index].mname,
          lname: $scope.users[index].lname,
          ldap: $scope.users[index].ldap,
          role: $scope.users[index].role,
          category: $scope.users[index].category,
          lang: $scope.users[index].lang,
          email: $scope.users[index].email
      });
    };

    $scope.rem_usr = function(index) {
      if ($scope.users.length > 1) $scope.users.splice(index, 1);
    };
  
    // TDK UX
    $scope.tdks = [{
      doorcode: "",
      tdkareacode: ""
    }];

    $scope.new_tdk = function(index) {
      $scope.tdks.splice(index + 1, 0, {
        doorcode: "",
        tdkareacode: ""
      });
    };

    $scope.cop_tdk = function(index) {
      $scope.tdks.splice(index + 1, 0, {
        doorcode: $scope.tdks[index].doorcode,
        tdkareacode: $scope.tdks[index].tdkareacode
      });
    };

    $scope.rem_tdk = function(index) {
      if($scope.tdks.length > 1) $scope.tdks.splice(index, 1);
    };
    
    // SPECIALS       

    $scope.close = function(id) {
        $("#"+id).css("visibility", "hidden");
    };        

    $scope.validate = function() {
        $("#validate").css("visibility", "visible");
        $scope.output = "";
        
        ////////////////////////////////////////////////////////////////////////
        $scope.output += "* WHS Profile Summary\n";
        if($scope.whs.whs_code === "") $scope.output += "- missing 'Warehouse code'\n";
        if($scope.whs.length_unit === "-") $scope.output += "- missing 'Length unit'\n";
        if($scope.whs.weight_unit === "-") $scope.output += "- missing 'Weigth unit'\n";
        if($scope.whs.volume_unit === "-") $scope.output += "- missing 'Volume unit'\n";
        if($scope.whs.def_copies === null) $scope.output += "- missing 'Default number of copies'\n";
        else if(isNaN($scope.whs.def_copies)) $scope.output += "- 'Default number of copies' must be a positive number or zero\n";
        else if($scope.whs.def_copies < 0) $scope.output += "- 'Default number of copies' must be a positive number or zero\n";
        if($scope.whs.init_number === null) $scope.output += "- missing 'Initial number'\n";
        else if(isNaN($scope.whs.init_number)) $scope.output += "- 'Initial number' must be a positive number or zero\n";
        else if($scope.whs.init_number < 0) $scope.output += "- 'Initial number' must be a positive number or zero\n";
        if($scope.whs.def_rec_loc === null)
            $scope.output += "- missing 'Default receiving location'\n";
        else if($scope.whs.def_rec_loc === "" && $scope.whs_loc_array[0].loc_code === "")
            $scope.output += "- please add some location\n";
        else if($scope.whs.def_rec_loc === "")
            $scope.output += "- missing 'Default receiving location'\n";
        if($scope.whs.def_unl_loc === null)
            $scope.output += "- missing 'Default unloading location'\n";
        else if($scope.whs.def_unl_loc === "" && $scope.whs_loc_array[0].loc_code === "")
            $scope.output += "- please add some location\n";
        else if($scope.whs.def_unl_loc === "")
            $scope.output += "- missing 'Default unloading location'\n";
        if($scope.whs.whs_timezone === "-") $scope.output += "- missing 'Warehouse timezone'\n";
        if($scope.whs.bus_unit === "") $scope.output += "- missing 'Businss Unit'\n";
        if($scope.whs.locality === "") $scope.output += "- missing 'Locality'\n";
        if($scope.whs.postcode === "") $scope.output += "- missing 'Postcode'\n";
        if($scope.whs.add_1 === "") $scope.output += "- missing 'Adressline 1'\n";
        if($scope.whs.phone_num === "") $scope.output += "- missing 'Phone number (international format)'\n";
        if($scope.whs.truckdock === "-") $scope.output += "- missing 'Truck-Dock managent in use'\n";
        if($scope.whs.sec_sys === "-") $scope.output += "- missing 'Security system equipped'\n";
        if($scope.whs.iata === "") $scope.output += "- missing 'IATA location'\n";
        if($scope.whs.loc_lang === "-") $scope.output += "- missing 'Warehouse local language'\n";
        if($scope.whs.boxid === "-") $scope.output += "- missing 'Activate boxid validation?'\n";
        if($scope.whs.outbound === "-") $scope.output += "- missing 'Automatic outbound loading upon deconsolidation?'\n";
        if($scope.whs.autoreceive === "-") $scope.output += "- missing 'Container autoreceive triggered by container unload?'\n";
        if($scope.whs.def_loc === null)
            $scope.output += "- missing 'Default location of outbound trucks'\n";
        else if($scope.whs.def_loc === "" && $scope.whs_loc_array[0].loc_code === "")
            $scope.output += "- please add some location\n";
        else if($scope.whs.def_loc === "")
            $scope.output += "- missing 'Default location of outbound trucks'\n";
        if($scope.whs.hb_label === "-") $scope.output += "- missing 'Consignee on HB label'\n";
        if($scope.whs.cus_clear === "-") $scope.output += "- missing 'Default Custom Clearance'\n";
        
        ////////////////////////////////////////////////////////////////////////
        $scope.output += "* WHS Location Management\n";
        var x = 0; do {
            if($scope.whs.whs_code === "") $scope.output += "- missing 'Warehouse code' on WHS Profile summary\n";
            if($scope.whs_loc_array[x].loc_code === "") $scope.output += "- missing 'Location Code' in row "+x+"\n";
            if($scope.whs_loc_array[x].loc_desc === "") $scope.output += "- missing 'Location Description' in row "+x+"\n";
            if($scope.whs_loc_array[x].scan_avail === "-") $scope.output += "- missing 'Location bar-code available for scanning' in row "+x+"\n";
            if($scope.whs_loc_array[x].loc_group === "") $scope.output += "- missing 'Location group' in row "+x+"\n";
            x++;
        } while (x < $scope.whs_loc_array.length);
        
        ////////////////////////////////////////////////////////////////////////
        $scope.output += "* Label Printers\n";
        var x = 0; do {
            if($scope.label_printers[x].qtype === "-") $scope.output += "- missing 'Label printer make (QTYPE)' in row "+x+"\n";
            if($scope.label_printers[x].ip === "") $scope.output += "- missing 'Label printer IP' in row "+x+"\n";
            if($scope.label_printers[x].onhand != 1 && $scope.label_printers[x].masterbill != 1 &&
                $scope.label_printers[x].housebill != 1 && $scope.label_printers[x].delivery != 1) {
                $scope.output += "- check at least one feature (ONHAND, Masterbill, Housebill, Delivery) in row "+x+"\n";
            }
            if($scope.label_printers[x].format === "-") $scope.output += "- missing 'Format' in row "+x+"\n";
            if($scope.label_printers[x].description === "") $scope.output += "- missing 'Printer Description' in row "+x+"\n";
            x++;
        } while (x < $scope.label_printers.length);

        ////////////////////////////////////////////////////////////////////////
        $scope.output += "* Users\n";
        var x = 0; do {
            if($scope.users[x].fname === "") $scope.output += "- missing 'First Name' in row "+x+"\n";
            if($scope.users[x].lname === "") $scope.output += "- missing 'Last Name' in row "+x+"\n";
            if($scope.users[x].ldap === "") $scope.output += "- missing 'LDAP id' in row "+x+"\n";
            if($scope.whs.whs_code === "") $scope.output += "- missing 'Warehouse code' on WHS Profile summary\n";
            if($scope.users[x].category === "-") $scope.output += "- missing 'FSI User Category' in row "+x+"\n";
            if($scope.users[x].lang === "-") $scope.output += "- missing 'Preferred Language' in row "+x+"\n";
            if($scope.users[x].email === "") $scope.output += "- missing 'Email Address' in row "+x+"\n";
            x++;
        } while (x < $scope.users.length);
        
        ////////////////////////////////////////////////////////////////////////
        if($scope.whs.truckdock === 1) {
            $scope.output += "* TDK\n";
            var x = 0; do {
                if($scope.tdks[x].doorcode === "") $scope.output += "- missing 'Door Code' in row "+x+"\n";
                if($scope.tdks[x].tdkareacode === "") $scope.output += "- missing 'TDK Area Code' in row "+x+"\n";
                x++;
            } while (x < $scope.tdks.length);
        }
    };
    
    $scope.savefile = function(file) {
        var a         = document.createElement('a');
        a.href        = 'data:attachment/json,' + JSON.stringify($scope.expo).split(' ').join('%20');
        a.target      = '_blank';
        a.download    = 'myFile.json.txt';

        document.body.appendChild(a);
        a.click();
    };
    
    $scope.export = function() {
        $("#export").css("visibility", "visible");
        $scope.output = "";
        
        $scope.expo = {whs: JSON.parse(JSON.stringify( $scope.whs )),
            whs_loc_array: JSON.parse(JSON.stringify( $scope.whs_loc_array )),
            label_printers: JSON.parse(JSON.stringify( $scope.label_printers )),
            users: JSON.parse(JSON.stringify( $scope.users )),
            tdks: JSON.parse(JSON.stringify( $scope.tdks )) };
        
        $scope.output = JSON.stringify($scope.expo);
    };
       
    $scope.import = function() {
        $("#import").css("visibility", "visible");
        $scope.output = "";
    };

    $scope.load = function() {
        var impo = JSON.parse($scope.output);
        $scope.whs = JSON.parse(JSON.stringify( impo.whs ));
        $scope.whs_loc_array = JSON.parse(JSON.stringify( impo.whs_loc_array ));
        $scope.label_printers = JSON.parse(JSON.stringify( impo.label_printers ));
        $scope.users = JSON.parse(JSON.stringify( impo.users ));
        $scope.tdks = JSON.parse(JSON.stringify( impo.tdks ));
        $scope.close('import');
        
        $scope.check($scope.whs_loc_array);
    };
        
    $scope.fourdigit = function(number) {
        var string = 10000+number.toString();
        return string.substr(string.length - 4);
    };
  
    $scope.sql = function() {    
        $("#sql").css("visibility", "visible");
        $scope.output = "set schema fsiuatlib;\n";
        $scope.output += "set path fsiuatlib;\n";
        
        $scope.output += "\n";
        $scope.output += "-- WHS Profile Summary Config\n";
        $scope.output += "\n";        
        $scope.output += "INSERT INTO WAREHOUSES (WHSCD,UOM_LENGTH,UOM_WEIGHT,UOM_VOLUME,ONH_COPIES,INITIAL_ONH_LINES,DEFAULT_REC_LOC,DEFAULT_UNL_LOC,TIME_ZONE,BUSINESS_UNIT,LOCATION,POSTCODE,ADDRESS_LINE_1,ADDRESS_LINE_2,ADDRESS_LINE_3,PHONE,FAX,USE_TDK_MANAGEMENT,USE_SECURITY_SYSTEM,IATA,LANGUAGE,BOXID_VALIDATION,USE_OUTBOUND_AUTOLOAD,USE_CONT_AUTORECV,DEFAULT_OUT_LOC,HIDE_CONSIGNEE_ON_HBLABEL,CUSTOMS_CLEARED)\n";
        $scope.output += "values ('"+$scope.whs.whs_code+"','"+$scope.whs.length_unit+"','"+$scope.whs.weight_unit+"','"+$scope.whs.volume_unit+"','"+
                $scope.whs.def_copies+"','"+$scope.whs.init_number+"','"+
                $scope.whs.def_rec_loc+"','"+$scope.whs.def_unl_loc+"','"+
                $scope.whs.whs_timezone+"','"+$scope.whs.bus_unit+"','"+$scope.whs.locality+"','"+$scope.whs.postcode+"','"+
                $scope.whs.add_1+"','"+$scope.whs.add_2+"','"+$scope.whs.add_3+"','"+$scope.whs.phone_num+"','"+$scope.whs.fax_num+"','"+
                $scope.whs.truckdock +"','"+$scope.whs.sec_sys+"','"+$scope.whs.iata+"','"+$scope.whs.loc_lang+"','"+
                $scope.whs.boxid+"','"+$scope.whs.outbound+"','"+$scope.whs.autoreceive+"','"+
                $scope.whs.def_loc+"','"+$scope.whs.hb_label+"','"+$scope.whs.cus_clear+"');\n";
        
        $scope.output += "\n";
        $scope.output += "-- WHS Location management Config\n";
        var x = 0; do {
            $scope.output += "\n";
            $scope.output += "INSERT INTO WHS_LOC (WHSCD,WHS_LOCATION_CODE,WHS_LOCID,WHS_LOCATION_GROUP,WHS_LOCATION_DESC) "+
                    "VALUES ('"+$scope.whs.whs_code+"','"+$scope.whs_loc_array[x].loc_code+"',NEXT VALUE FOR WHSLOC_SEQ,"+
                    "'"+$scope.whs_loc_array[x].loc_group+"','"+$scope.whs_loc_array[x].loc_desc+"');\n";
            x++;
        } while (x < $scope.whs_loc_array.length);     
        
        $scope.output += "\n";      
        $scope.output += "-- Printers Config\n";
        $scope.output += "\n";        
        $scope.output += "create or replace variable printqueueid integer;\n";
        
        var x = 0; do {
            if($scope.label_printers[x].onhand != 1 && $scope.label_printers[x].masterbill != 1 &&
                $scope.label_printers[x].housebill != 1 && $scope.label_printers[x].delivery != 1) {
                x++;
                continue;
            }
            $scope.output += "\n";     
            $scope.output += "set printqueueid = next value for PRTQUE_SEQ;\n";
            $scope.output += "INSERT INTO PRTQUEUE(PRQURN, QNAME, QDESC, QTYPE,format) "+
                "VALUES(printqueueid, '/QSYS.LIB/QUSRSYS.LIB/"+$scope.whs.whs_code+$scope.fourdigit(x+1)+".outq','"+
                $scope.label_printers[x].description+"','"+
                $scope.label_printers[x].qtype+"','"+$scope.label_printers[x].format+"');\n";
                
                $scope.output += "-- AS/400 OUTQUEUE IP: "+$scope.label_printers[x].ip +" NAME: "+$scope.whs.whs_code+$scope.fourdigit(x+1)+"\n";
                
            if($scope.label_printers[x].onhand)
                $scope.output += "INSERT INTO PRINTERS(PRQURN,WHSCD, DOCCLASS, BUSPROCESS, WHS_LOCATION_CODE) "+
                                 "VALUES(printqueueid,'"+$scope.whs.whs_code+"','ONHLABEL',null,null);\n";
            if($scope.label_printers[x].masterbill)
                $scope.output += "INSERT INTO PRINTERS(PRQURN,WHSCD, DOCCLASS, BUSPROCESS, WHS_LOCATION_CODE) "+
                                 "VALUES(printqueueid,'"+$scope.whs.whs_code+"','MBLABEL',null,null);\n";
            if($scope.label_printers[x].housebill)
                $scope.output += "INSERT INTO PRINTERS(PRQURN,WHSCD, DOCCLASS, BUSPROCESS, WHS_LOCATION_CODE) "+
                                 "VALUES(printqueueid,'"+$scope.whs.whs_code+"','HBLABEL',null,null);\n";
            if($scope.label_printers[x].delivery)
                $scope.output += "INSERT INTO PRINTERS(PRQURN,WHSCD, DOCCLASS, BUSPROCESS, WHS_LOCATION_CODE) "+
                                 "VALUES(printqueueid,'"+$scope.whs.whs_code+"','DELILABEL',null,null);\n";
            x++;
        } while (x < $scope.label_printers.length);

        $scope.output += "\n";
        $scope.output += "drop variable printqueueid;\n";
        $scope.output += "\n";
        $scope.output += "-- Users Config\n";

        var x = 0; do {
            if($scope.users[x].category === "CUSER") {
                x++;
                continue;
            }
            $scope.output += "\n";
            $scope.output += "call CreateUserIfNotExists ('"+$scope.users[x].ldap+
                    "','"+$scope.users[x].fname+" "+$scope.users[x].lname+"','"+$scope.users[x].lang+
                    "','"+$scope.users[x].email+"');\n";
            $scope.output += "call AssignRole ('"+$scope.users[x].ldap+"','PUSER');\n";
            $scope.output += "call AssignWarehouse ('"+$scope.users[x].ldap+"','"+$scope.whs.whs_code+"','1');\n";
            x++;
        } while (x < $scope.users.length);
        
        if($scope.whs.truckdock.toString() !== "1") {
            $scope.output += "\n";
            $scope.output += "COMMIT;";
            return;
        }
        
        $scope.output += "\n";        
        $scope.output += "-- TDK Config\n";
        $scope.output += "\n";        
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'SHT', 'EI', 'Export - Stock In');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'SHT', 'EO', 'Export - Stock Out');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'SHT', 'II', 'Import - Stock In');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'SHT', 'IO', 'Import - Stock Out');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'SHT', 'TS', 'Transhipment');\n";

        // TDK LOGIC HERE <<<
        // define array (table) with two collumns area id [0] and area code [1]
        var unique_area = [[]];

        // extract unique areas and store it in array unique_area
        $scope.output += "\n";
        $scope.output += "-- system variables (how many TDK areas, so many integers)\n";
        var i = 0; do {
            if($scope.whs_loc_array[i].tdkareacode===null) {
                i++;
                continue;
            }
            unique_area[0][0] = "area1";
            unique_area[0][1] = $scope.whs_loc_array[i].tdkareacode;
            break;
        } while(i < $scope.locations.length);

        var i = 0; do {
            var ual = unique_area.length;
            var add = true;

            var x = 0; do {
                if(unique_area[x][1] == $scope.whs_loc_array[i].tdkareacode) {
                    add = false;
                    break;
                }
                x++;
            } while (x < ual);

            if($scope.whs_loc_array[i].tdkareacode === null) add=false;

            if(add) {
                unique_area.push([]);
                unique_area[ual][0] = "area" + (ual + 1);
                unique_area[ual][1] = $scope.whs_loc_array[i].tdkareacode;
            }
            i++;
        } while (i < $scope.whs_loc_array.length);

        var i = 0; do {
            $scope.output += "create or replace variable "+unique_area[i][0]+" integer;\n";
            i++;
        } while (i < unique_area.length);

        $scope.output += "\n";
        $scope.output += "--system variables filled with unique sequence\n";
        var i = 0; do {
            $scope.output += "set "+unique_area[i][0]+" = next value for TDKCFG_SEQ;\n";
            i++;
        } while (i < unique_area.length);

        $scope.output += "\n";
        $scope.output += "-- Creating TDK AREAS, using system variables filled with sequence\n";
        var i = 0; do {
            $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES("+unique_area[i][0]+", '"+$scope.whs.whs_code+"', 'WHA', null, '"+unique_area[i][1]+"');\n";
            i++;
        } while (i < unique_area.length);

        unique_area.FindAreaID = function (area_code) {
            var i = 0; do {
                if(unique_area[i][1] == area_code) return unique_area[i][0];
                i++;
            } while (i < unique_area.length);
        } // returns area id from area code needed below

        $scope.output += "\n";
        $scope.output += "-- Assigning door codes to TDK areas\n";
        var i = 0; do {
            var area_id = unique_area.FindAreaID($scope.tdks[i].tdkareacode);
            if (typeof area_id === 'undefined') {
                i++;
                continue;
            }
            var door_code = $scope.tdks[i].doorcode;
            $scope.output += "INSERT INTO TDK_CARPRK (CARPARKURN, CFGURN_WHS_AREA, CODE) VALUES(NEXT VALUE FOR CARURN_SEQ,"+area_id+",'"+door_code+"');\n";
            i++;
        } while (i < $scope.tdks.length);
        $scope.output += "\n";

        $scope.output += "-- Assigment of whs locations to TDK Area\n";
        var i = 0; do {
            var area_id = unique_area.FindAreaID($scope.whs_loc_array[i].tdkareacode);
            if (typeof area_id === 'undefined') {
                i++;
                continue;
            }
            var loc_code = $scope.whs_loc_array[i].loc_code;
            $scope.output += "INSERT INTO TDK_WHSLOC(WHSLOCURN, WHS_LOCATION_CODE,CFGURN_WHS_AREA) VALUES (NEXT VALUE FOR TDKLOC_SEQ,'"+loc_code+"',"+area_id+");\n";
            i++;
        } while (i < $scope.whs_loc_array.length);
        $scope.output += "\n";

        // droping created sql variables
        var i = 0; do {
            $scope.output += "drop variable "+unique_area[i][0]+";\n";
            i++;
        } while (i < unique_area.length);
        
        $scope.output += "\n"; 
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'RPT', 'HC', 'Hand Carry');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'RPT', 'TR', 'Truck');\n";
        $scope.output += "\n"; 
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHT', 'CSH', 'Cash');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHT', 'OCT', 'Octopus');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHT', 'WAI', 'Waived');\n";
        $scope.output += "\n"; 
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '0');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '60');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '100');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '120');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '180');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '200');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '240');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '300');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '360');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '400');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '480');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '500');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '600');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '700');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '800');\n";
        $scope.output += "INSERT INTO TDK_CONFIG (CFGURN, WHCD, DOMAIN, NAME, VALUE) VALUES(NEXT VALUE FOR TDKCFG_SEQ, '"+$scope.whs.whs_code+"', 'CHA', null, '900');\n";

        $scope.output += "\n--\n\nCOMMIT;";
    };
}]);

