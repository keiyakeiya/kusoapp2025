import 'dart:js';
import 'dart:html';

void html_setup() {
  final header_elem = DivElement();
  header_elem?.setAttribute('id', 'header');
  final title_elem = DivElement()..text = '【たくさん】 モンティ・ホール問題';
  title_elem?.setAttribute('id', 'title');
  header_elem?.append(title_elem);

  final message_area_elem = DivElement();
  message_area_elem?.setAttribute('id', 'message');

  final container_elem = DivElement();
  container_elem?.setAttribute('id', 'container');

  document.body?.append(header_elem);
  document.body?.append(message_area_elem);
  document.body?.append(container_elem);

}

void main() {
  context['html_setup'] = allowInterop(html_setup);
}
