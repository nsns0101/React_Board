<?php
//도우미 함수를 사용하기 위해 composer.json 등록해야함
//autoload에 "files": ["app/helpers"] 선언 후
//composer dump-autoload --optimize

function attachments_path($path = null)
{   
    //DIRECTORY_SEPARATOR는 해당 운영체제의 '/'나 '\' 기호를 '/'로 나타내줌 
    return public_path('files'.($path ? DIRECTORY_SEPARATOR.$path : $path));
}

//파일 사이즈 형식
function format_filesize($bytes){
    //is_numeric은 인자값이 숫자인지를 판단   숫자면 true를 리턴
    if(! is_numeric($bytes)) return 'NaN';      //숫자가 아니면 'NaN'을 리턴

    $decr = 1024;
    $step = 0;
    $suffix = ['bytes','KB','MB'];

    while (($bytes/$decr) > 0.9){   //인자로 받은 값을 1024로 나뉘어 0.9보다 크면 나누기를 반복
        $bytes = $bytes/$decr;      
        $step ++;
    }
    //소수점 두번째까지 자리까지 반올림  
    return round($bytes,2) .$suffix[$step];
}

?>