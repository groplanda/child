<?php namespace Acme\ContactForm\Classes;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Validator;
use ValidationException;
use Mail;
use Backend\Models\User;
use Acme\ContactForm\Models\Application;

class ContactFormController extends Controller
{


  public function getUserMail() {

    return User::where('is_superuser', 1)->value('email');

  }

  public function send(Request $request)
  {

    $rules = [
      'user_name'  => 'required|min:3|max:50',
      'user_phone' => 'required|min:5|max:50',
      'user_email'  => 'email',
      'user_message' => 'max:1000'
    ];

    $car_rules = [
      'user_phone' => 'required|min:5|max:50',
      'user_car'  => 'required',
      'user_model' => 'required',
    ];

    $messages = [
      'required' => 'Поле обязательно к заполнению!',
      'min'      => 'Минимум :min символов!',
      'max'      => 'Максимум :max символов!',
      'email'    => 'Некорректный e-mail',
      'user_phone.required' => 'Укажите номер',
      'user_car.required' => 'Выберите марку авто',
      'user_model.required' => 'Выберите модель авто'
    ];

    $is_car_form = $request->get('user_form') === "car";

    if ($is_car_form) {
      $validator = Validator::make($request->all(), $car_rules, $messages);
    } else {
      $validator = Validator::make($request->all(), $rules, $messages);
    }

    //если не прошло валидацию
    if ($validator->fails()) {

      $validatorErrors = $validator->errors()->toArray();
      return response()->json(array_merge(['status' => 'error'], $validatorErrors));

    } else {
      //переменные
      $vars = [
        'user_name' => $request->get('user_name'),
        'user_phone' => $request->get('user_phone'),
        'user_email' => $request->get('user_email'),
        'user_message' => $request->get('user_message'),
      ];

      //вставка в базу данных
      $query = new Application();
      $query->user_name = $request->get('user_name');
      $query->user_phone = $request->get('user_phone');
      $query->user_mail = $request->get('user_email');

      if ($is_car_form) {
        $query->user_message = $request->get('user_car') . ' - ' .$request->get('user_model');
      } else {
        $query->user_message = $request->get('user_message');
      }

      $query->user_ip = $_SERVER["REMOTE_ADDR"];
      $query->user_status = 1;
      $query->created_at = time();
      $query->save();

      //отправка на почту
      Mail::send('acme.contactform::mail.message', $vars, function($message) {

          $message->to($this->getUserMail(), 'Admin Person');
          $message->subject('Сообщение с сайта');

      });

      if($query) {
        return response()->json(['status' => 'success','message' => 'Сообщение успешно отправлено, спасибо!']);
      } else {
        return response()->json(['status' => 'error','message' => 'Произошла ошибка!']);
      }

    }

  }

}
