<?php
class BD_mysql {
	private $conexion;
	private $resource;
	private $sql;
        private $bdatos;
	public static $queries;
	public static $_singleton;
  
	public static function getInstancia($server,$root,$pass,$bd){
		if (is_null (self::$_singleton)) {
			self::$_singleton = new BD_mysql($server,$root,$pass,$bd);

		}
		return self::$_singleton;
	}
	private function __construct($server,$root,$pass,$bd){
		$this->conexion = @mysql_pconnect($server, $root, $pass);
		mysql_select_db($bd, $this->conexion);
                $this->bdatos=$bd;
    mysql_set_charset('utf8');
		self::$queries = 0;
		$this->resource = null;
	}
        public function doIT()
    {
      if (!($cur = $this->execute())){return false;}else{return true;}
  
    }
	public function execute(){
	
    	if(!($this->resource = mysql_query($this->sql, $this->conexion))){
		  	#return mysql_errno()."->".mysql_error();
            return NULL;
		}
		self::$queries++;
		return $this->resource;
        
       
	}
  
	public function getTuplas(){
		if (!($cur = $this->execute())){
			return null;
		}
		$array = array();
		while ($row = @mysql_fetch_object($cur)){
			$array[] = $row;
		}
		return $array;
	}
        public function getFila()
    {
      		if (!($cur = $this->execute())){
			return null;
		}
		$array = array();
		$row = @mysql_fetch_assoc($cur);
		return $row;
       
    }
	public function setQuery($sql){
		if(empty($sql)){
			return false;
		}
		$this->sql = $sql;
		return true;
	}
	public function freeResults(){
		@mysql_free_result($this->resource);
		return true;
	}

    private function createDB($BASE)
    {
        if (mysql_query("CREATE DATABASE IF NOT EXISTS $BASE DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;",$this->conexion))
        {  return true;  }else{  return false;  }
    }
    
    public function createTABLE($nombre,$array_campos,$array_tamaños)
    {
        $sql="CREATE TABLE IF NOT EXISTS $nombre ( id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,";
        foreach ($array_campos as $campo => $value)
        {
            $varchar=$value;
            $si= $campo ." VARCHAR(".$array_tamaños[$campo].") CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL, ";
            $sql.=$si;
                                   
        }
        $sql.="PRIMARY KEY(id) )ENGINE = MYISAM CHARACTER SET utf8 COLLATE utf8_unicode_ci";
        $this->setQuery($sql);
        #echo "|".$sql."|";
        $cur = $this->execute();
        if ($cur) {return true;} else {  return false; }
    }

public function IN($tabla,$arr_campos,$valis=null,$req=null,$sizes=null)
{
  
 if($this->is_tabla($tabla))
 {
     #echo("insertando");
    if($this->INSERTA($tabla,$arr_campos,$valis,$req)){return true;}else{return false;}
 }else{
        if($this->createTABLE($tabla,$arr_campos,$sizes))
            {
                 if($this->INSERTA($tabla,$arr_campos,$valis,$req)){return true;}else{return false;} 
            }else{ echo "<br>".mysql_errno().":->".mysql_error()."<hr><br>".$this->sql."<hr>";}
      } 
                         
}
    
public function is_tabla($nombre_tb="") {
$tablas = @mysql_list_tables($this->bdatos);
while (list($tabla) = mysql_fetch_array($tablas)) 
{
if ($nombre_tb == $tabla){return true;}

}
return false;
}
    
    public function INSERTA($tabla,$arr_campos,$valis=null,$req=null)
    {   
     
        $consulta = "INSERT INTO $tabla (";
        foreach ($arr_campos as $campo => $value)
            {
                $consulta.=$campo.",";
                
            }
        $consulta=substr($consulta,0,strlen($consulta)-1);
        $consulta .=" ) values (";
        foreach ($arr_campos as $campo => $value)
        {   
            #echo "Campo:".$campo.":->".$valis[$campo];
            $value=$this->withoutXSS($value,$valis[$campo],$req[$campo],$this->conexion);
            $consulta.="'".$value."',";
          
        }
        $consulta=substr($consulta,0,strlen($consulta)-1);
        $consulta.=")";
        #echo '<P>'.$consulta.'</P>';
        $this->setQuery($consulta);
        
        $cur = $this->execute();
        #echo '<p>Result: '.$cur.'</p>';
        
        if(!$cur){echo false;}else{return true;}
        
    } 
    public function updaTabla($tabla,$arr_campos,$id)
    {
             $consulta = "UPDATE $tabla SET ";
        foreach ($arr_campos as $campo => $value)
            {
                #$value=$this->withoutXSS($value,$valis[$campo],$req[$campo],$this->conexion);
                if($campo=="selector" || $campo=="id"){}else
                {
                    $consulta.=$campo."='$value', ";
                }
            }
        $consulta=substr($consulta,0,strlen($consulta)-2);
        //$consulta.=" WHERE id=".$arr_campos[id];
        $consulta.=" WHERE ".$id."=".$arr_campos["id"];
        #echo $consulta;
        $this->setQuery($consulta);
        $cur = $this->execute();
        
        if(!$cur){echo false;}else{return true;}   
    }
      
    public function withoutXSS($theValue, $theType, $required ,$link, $theDefinedValue = "", $theNotDefinedValue = "")
	 {   
	   if($required==1 && strlen($theValue)<=0){die("**Todos los campos son obligatorios");}
       $theValue=strip_tags($theValue);
  		if(PHP_VERSION<6)
		{
			$theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
		}
		$theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue,$this->conexion) : mysql_escape_string($theValue);
		switch ($theType) {
			case "pass":
            case "text":
			  $theValue = ($theValue != "") ? "'" . trim($theValue) . "'" : "NULL";
			  break;    
			case "long":
			case "int":
                if(is_numeric($theValue)){            
			  $theValue = ($theValue != "") ? intval($theValue) : "NULL";
                                         }else{die("Existen campos que aceptan solo numeros");}
			  break;
			case "double":
			  $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
			  break;
			case "date":
			  $theValue = ($theValue != "") ? "'" . trim($theValue) . "'" : "NULL";
			  break;
			case "defined":
			  $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
			  break;
            case "strikto": 
              $theValue = ($theValue != "") ? "'".strikto($theValue)."'" : "NULL";
              break; 
            case "email":
                if($this->isi_email($theValue)){ $theValue="'".$theValue."'";
                               }else{
                                        die("Escribe un email valido");
                                    }
                break;
            
                   
		}
		return $theValue;
    }
    
#----------------------------------->FUNCIONES DE VALIDACION DE DATOS    
    function strikto($tags){ 
    if(PHP_VERSION<6)
		{
			$tags = get_magic_quotes_gpc() ? stripslashes($tags) : $tags;
		}
    $tags = strip_tags($tags);  
    $tags =str_replace( "<", "", $tags );
    $tags =str_replace( "'", "", $tags );
    $tags =str_replace( ">", "", $tags );
    $tags =str_replace( " ", "", $tags );
    $tags =str_replace( "%", "", $tags );
    $tags =str_replace( " ", "", $tags );
    $tags =str_replace( "(", "", $tags );
    $tags =str_replace( ")", "", $tags );
    $tags =str_replace( "/", "", $tags );
    $tags =str_replace( "&", "", $tags );
    $tags =str_replace( ";", "", $tags );
    $tags =str_replace( ",", "", $tags );
    $tags =str_replace( "\"", "", $tags );
    $tags =str_replace( "\\", "", $tags );
    $tags =str_replace( "=", "", $tags );
    $tags =str_replace( "|", "", $tags );
    $tags =str_replace( "/", "", $tags );
    $tags =str_replace( "prompt", "", $tags );
    $tags =preg_replace("/¡|¿|\?|!|\^|'|:|#|\$|%|&|\"|~|\+|\*|\/|\||\\|\[|\]|\(|\)|\{|\}/","",$tags);
    return $tags;  
}
 function isi_email($email)

{ 
   	$mail_correcto = 0; 
   	//compruebo unas cosas primeras 
   	if ((strlen($email) >= 6) && (substr_count($email,"@") == 1) && (substr($email,0,1) != "@") && (substr($email,strlen($email)-1,1) != "@")){ 
      	 if ((!strstr($email,"'")) && (!strstr($email,"\"")) && (!strstr($email,"\\")) && (!strstr($email,"\$")) && (!strstr($email," "))) { 
         	 //miro si tiene caracter . 
         	 if (substr_count($email,".")>= 1){ 
            	 //obtengo la terminacion del dominio 
            	 $term_dom = substr(strrchr ($email, '.'),1); 
            	 //compruebo que la terminación del dominio sea correcta 
            	 if (strlen($term_dom)>1 && strlen($term_dom)<5 && (!strstr($term_dom,"@")) ){ 
               	 //compruebo que lo de antes del dominio sea correcto 
               	 $antes_dom = substr($email,0,strlen($email) - strlen($term_dom) - 1); 
               	 $caracter_ult = substr($antes_dom,strlen($antes_dom)-1,1); 
               	 if ($caracter_ult != "@" && $caracter_ult != "."){ 
                  	 $mail_correcto = 1; 
               	 } 
            	 } 
         	 } 
      	 } 
   	} 
   	if ($mail_correcto) 
      	 return 1; 
   	else 
      	 return 0; 
}     

	function __destruct(){
		@mysql_free_result($this->resource);
		@mysql_close($this->conexion);
	}
}
?>