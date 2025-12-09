import 'dart:js';

void hello_dart(String arg) {
  print('Hello from Dart! $arg!');
}

void main() {
  context['hello_dart'] = allowInterop(hello_dart);
}
