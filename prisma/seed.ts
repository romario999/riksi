import { ProductStickers } from '@prisma/client';
import { prisma } from './prisma-client';

const categories = [
  {
    name: 'Білизна',
    categoryUrl: 'bilyzna',
    description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ласкаво просимо до нашого каталогу жіночої білизни на RIKSI.ua! У нас широкий асортимент бюстгальтерів, трусиків, поясів та аксесуарів до них. Кожен предмет білизни в нашому асортименті - це поєднання вишуканого дизайну та найвищої якості. У нас ви знайдете різноманіття кроїв та кольорів.</p>       <p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Наші бюстгальтери поєднують зручність та стиль. Ми хочемо, щоб вдягнувши його Ви відчули себе впевненою та красивою.</p>       <p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Трусики - це важлива частина Вашого гардероба. У нашому асортименті представлена ​​різноманітність фасонів та тканин, щоб ви могли знайти ідеальний варіант.</p>       <p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Пояси та аксесуари - не відʼємна частина кожної сучасної жінки. Вони дають нотку елегантності та завершеності Вашому комплекту білизни.</p>       <p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Знайдіть ідеальну жіночу білизну на RIKSI.ua та перетворіть кожен день у святкову подію!</p>',
    subcategories: [
      { name: 'Бюстгалтери', subcategoryUrl: 'biusthaltery', description: '<div class="text"><p style="text-align: justify;">Шукаєте бюстгальтер, який буде не лише красивим, але й зручним? RIKSI пропонує широкий асортимент бюстгальтерів на будь-який смак і тип фігури.</p><br /><p style="text-align: justify;">Ідеальна посадка: Наші бюстгальтери розроблені з урахуванням анатомічних особливостей жіночого тіла, щоб забезпечити ідеальну посадку та максимальний комфорт протягом дня.</p><br /><p style="text-align: justify;">Трендові моделі: Ми постійно оновлюємо нашу колекцію бюстгальтерів, щоб запропонувати вам наймодніші та актуальні моделі.</p><br /><p style="text-align: justify;">Доступні ціни: Ми віримо, що якісна білизна має бути доступною для кожної жінки. Тому ми пропонуємо бюстгальтери за доступними цінами без шкоди для якості.</p><br /><p style="text-align: justify;">Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції бюстгальтерів, які допоможуть вам створити неповторний образ.</p><br /><p style="text-align: justify;">RIKSI - ваш секрет краси та комфорту.</p></div>'},
      { name: 'Трусики', subcategoryUrl: 'trusyky', description: '<div class="text"><p style="text-align: justify;">Шукаєте трусики, які поєднують в собі комфорт, стиль та якість? RIKSI пропонує широкий асортимент трусиків на будь-який смак і тип фігури.</p><br/><p style="text-align: justify;">Комфорт на весь день: Наші трусики виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</p><br/><p style="text-align: justify;">Стильні та трендові моделі: Ми постійно оновлюємо нашу колекцію трусиків, щоб запропонувати вам наймодніші та актуальні моделі.</p><br/><p style="text-align: justify;">Доступні ціни: Ми віримо, що якісна білизна має бути доступною для кожної жінки. Тому ми пропонуємо трусики за доступними цінами без шкоди для якості.</p><br/><p style="text-align: justify;">Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції трусиків, які допоможуть вам створити неповторний образ.</p><br/><p style="text-align: justify;">RIKSI - ваш комфорт та впевненість</p><br/></div>' },
      { name: 'Пояси', subcategoryUrl: 'poiasy', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте пояс, який підкреслить вашу фігуру та забезпечить комфорт протягом дня? RIKSI пропонує широкий асортимент поясів на будь-який смак і тип фігури.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Ідеальна посадка: Наші пояси розроблені з урахуванням анатомічних особливостей жіночого тіла, щоб забезпечити ідеальну посадку та максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Трендові моделі: Ми постійно оновлюємо нашу колекцію поясів, щоб запропонувати вам наймодніші та актуальні моделі.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісна білизна має бути доступною для кожної жінки. Тому ми пропонуємо пояси за доступними цінами без шкоди для якості.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції поясів, які допоможуть вам створити неповторний образ.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI - ваш секрет краси та підкреслення фігури.</p></div>' },
    ],
  },
  {
    name: 'Боді',
    categoryUrl: 'body',
    description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе світ елегантних боді від RIKSI. Наші моделі поєднують у собі вишуканий дизайн та високу якість. Оберіть боді, яке виражає Ваш стиль та додає вишуканості Вашому образу.</p>       <p style="text-align: justify; font-size: 18px; font-weight: bold; line-height: 1.6; color: #222; margin-bottom: 20px;">RIKSI пропонує широкий асортимент боді на будь-який смак:</p>       <ul style="padding-left: 20px; margin-bottom: 20px;">         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Класичні боді: Ідеально підходять для створення офіційного або ділового образу.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Боді з мереживом: Додадуть романтики та жіночності Вашому образу.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Боді з відкритими плечима: Підкреслять Вашу красу та сексуальність.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Боді з довгими рукавами: Ідеально підходять для прохолодної погоди.</li>       </ul>       <p style="text-align: justify; font-size: 18px; font-weight: bold; line-height: 1.6; color: #222; margin-bottom: 20px;">Переваги боді RIKSI:</p>       <ul style="padding-left: 20px; margin-bottom: 20px;">         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла та не викликають подразнення.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Ідеальна посадка: Розроблені з урахуванням анатомічних особливостей жіночого тіла, щоб забезпечити комфорт протягом дня.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми постійно оновлюємо нашу колекцію боді, щоб запропонувати Вам наймодніші та актуальні моделі.</li>         <li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісна білизна має бути доступною для кожної жінки. Тому ми пропонуємо боді за доступними цінами без шкоди для якості.</li>       </ul>       <p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З боді RIKSI Ви завжди будете почувати себе впевнено та неперевершено.</p>',
    subcategories: [],
  },
  {
    name: 'Домашній одяг',
    categoryUrl: 'domashniy-odiah',
    description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ласкаво просимо до каталогу домашнього одягу на RIKSI.ua! У нас представлені лонгсліви, шорти, топи, футболки, кардигани, сорочки, халати та штани. Обирайте найкращий одяг для комфорту та затишку вдома. Насолоджуйтесь шкірною міттю у Вашому улюбленому одежі.</p><p style="text-align: justify; font-size: 18px; font-weight: bold; line-height: 1.6; color: #222; margin-bottom: 20px;">RIKSI пропонує широкий асортимент домашнього одягу на будь-який смак:</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лонгсливи: Мʼякі та затишні лонгсливи ідеально підходять для прохолодних вечорів і холодних ранків.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Шорти: Зручні та стильні шорти стануть незамінною частиною Вашого гардеробу для домашнього відпочинку.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Топи: Комфортні топи стануть основою Ваших домашніх образів.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Футболки: Мʼякі футболки з логотипом RIKSI або цікавими написами підкреслять Ваш стиль.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Кардигани: Мʼякі та елегантні кардигани зігрівають Вас у прохолодну погоду.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Сорочки: Сорочки з легких та приємних до тіла тканин стануть Вашим улюбленим одягом для домашнього відпочинку.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Халати: Мʼякі та затишні халати з натуральних тканин дарують Вам відчуття комфорту та затишку.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Штани: Зручні та стильні штани з бавовни або трикотажу стануть Вашим улюбленим одягом для домашнього відпочинку.</li></ul><p style="text-align: justify; font-size: 18px; font-weight: bold; line-height: 1.6; color: #222; margin-bottom: 20px;">Переваги домашнього одягу RIKSI:</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Виготовлений з мʼяких, натуральних матеріалів, які приємні до тіла та не викликають подразнення.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Зручний крій: Одяг RIKSI розроблений з урахуванням анатомічних особливостей жіночого тіла, щоб забезпечити максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент домашнього одягу на будь-який смак, який підкреслить Ваш стиль та індивідуальність.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісний домашній одяг має бути доступним для кожної жінки. Тому ми пропонуємо одяг за доступними цінами без шкоди для якості.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З домашнім одягом RIKSI Ви завжди будете відчувати себе комфортно та затишно.</p>',
    subcategories: [
      { name: 'Топи', subcategoryUrl: 'topy', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте зручний та стильний топ для домашнього відпочинку? RIKSI пропонує широкий асортимент топів на будь-який смак та тип фігури.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші топи виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент топів на будь-який смак: одноколірні, з принтами, з короткими та довгими рукавами, облягаючі та вільні.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісний домашній одяг має бути доступним для кожної жінки. Тому ми пропонуємо топи за доступними цінами без шкоди для якості.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції топів, які допоможуть Вам створити неповторний образ.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З топами RIKSI Ви завжди будете почувати себе комфортно та затишно.</p></div>' },
      { name: 'Футболки', subcategoryUrl: 'futbolky', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте зручну та стильну футболку для домашнього відпочинку? RIKSI пропонує широкий асортимент футболок на будь-який смак та тип фігури.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші футболки виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент футболок на будь-який смак: одноколірні, з принтами, з короткими та довгими рукавами, облягаючі та вільні.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісний домашній одяг має бути доступним для кожної жінки. Тому ми пропонуємо футболки за доступними цінами без шкоди для якості.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції футболок, які допоможуть Вам створити неповторний образ.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З футболками RIKSI Ви завжди будете почувати себе комфортно та затишно.</p></div>' },
      { name: 'Лонгсліви', subcategoryUrl: 'longslivy', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте мʼякий та затишний лонгслів для прохолодних вечорів вдома? RIKSI пропонує широкий асортимент лонгслівів на будь-який смак та тип фігури.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші лонгсліви виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент лонгслівів на будь-який смак: одноколірні, з принтами, з довгими рукавами, облягаючі та вільні.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісний домашній одяг має бути доступним для кожної жінки. Тому ми пропонуємо лонгсліви за доступними цінами без шкоди для якості.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, ми також пропонуємо лімітовані колекції лонгслівів, які допоможуть Вам створити неповторний образ.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З лонгслівами RIKSI Вам завжди буде тепло та затишно.</p></div>' },
      { name: 'Кардигани', subcategoryUrl: 'kardyhany', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Навіть вдома хочеться виглядати стильно та відчувати себе комфортно. Кардигани RIKSI - ідеальне рішення для прохолодних вечорів.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент кардиганів на будь-який смак: однотонні, з візерунками, довгі та короткі, на ґудзиках або блискавці.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші кардигани виготовлені з мʼяких та приємних до тіла матеріалів, які забезпечать тепло та комфорт.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Універсальність: Кардигани RIKSI можна легко поєднувати з іншим домашнім одягом, таким як штани, лонгсліви або футболки.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що стильний домашній одяг має бути доступним. Тому пропонуємо кардигани за приємними цінами.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, знайдете також лімітовані колекції кардиганів, які допоможуть виділитись.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З кардиганами RIKSI Ви завжди будете виглядати стильно та відчувати себе затишно вдома.</p></div>' },
      { name: 'Сорочки', subcategoryUrl: 'sorochky', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте зручну та стильну сорочку для домашнього відпочинку? RIKSI пропонує широкий асортимент сорочок на будь-який смак та тип фігури.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші сорочки виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо широкий асортимент сорочок на будь-який смак: одноколірні, з візерунками, вільні та приталені, з ґудзиками.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Універсальність: Сорочки RIKSI можна легко поєднувати з іншим домашнім одягом, таким як штани, лонгсліви або футболки.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що стильний домашній одяг має бути доступним. Тому пропонуємо сорочки за приємними цінами.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, знайдете також лімітовані колекції сорочок, які допоможуть виділитись.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З сорочками RIKSI Ви завжди будете почувати себе комфортно та затишно вдома.</p></div>' },
      { name: 'Халати', subcategoryUrl: 'halaty', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Пориньте у світ домашнього затишку з розкішними халатами RIKSI. Ми пропонуємо широкий вибір халатів, щоб кожна жінка могла знайти ідеальний варіант для себе.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Неперевершена якість: Виготовлені з натуральних, мʼяких на дотик матеріалів, наші халати забезпечать комфорт та приємні відчуття після душу або ванни.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Розкішний дизайн: Халати RIKSI представлені у різноманітних дизайнах, щоб відповідати вашому стилю. Обирайте однотонні халати або моделі з елегантними візерунками.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Практичність та комфорт: Наші халати мають зручний крій, який не буде сковувати рухів. До того ж різноманітні довжини та фасони дозволять підібрати ідеальний варіант для будь-якої фігури.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: RIKSI вірить, що розкішний домашній одяг має бути доступним для кожної. Тому ми пропонуємо халати за привабливими цінами.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, ви також знайдете ексклюзивні халати з лімітованих колекцій, які підкреслять вашу індивідуальність.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З халатами RIKSI відчуття домашнього затишку вийдуть на новий рівень.</p></div>' },
      { name: 'Шорти', subcategoryUrl: 'shorty', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Насолоджуйтесь комфортом та свободою рухів вдома з шортами RIKSI. Ми пропонуємо широкий асортимент шортів на будь-який смак.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші шорти виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла та дозволяють шкірі дихати.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо різноманітні фасони шортів, щоб ви могли обрати модель, яка ідеально підходить вашому стилю. Відкрийте для себе класичні або спортивні моделі, шорти з високою талією або ж вільнішого крою.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, RIKSI пропонує ексклюзивні шорти з лімітованих колекцій, які допоможуть вам створити неповторний образ.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що стильний домашній одяг має бути доступним для кожної жінки. Тому пропонуємо шорти за приємними цінами.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Комфорт та свобода рухів: Шорти RIKSI не будуть сковувати ваших рухів, дозволяючи вам повністю розслабитись вдома.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З шортами RIKSI відчуйте себе вільно та комфортно під час домашнього відпочинку.</p></div>' },
      { name: 'Штани', subcategoryUrl: 'shtany', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте зручні та стильні штани для дому? RIKSI пропонує широкий вибір домашніх штанів, які подарують вам відчуття комфорту та затишку.</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Висока якість: Наші штани виготовлені з мʼяких, натуральних матеріалів, які приємні до тіла, не викликають подразнення та забезпечують максимальний комфорт протягом дня.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильний дизайн: Ми пропонуємо різноманітні фасони домашніх штанів, щоб ви могли обрати модель, яка підходить вашому стилю. Відкрийте для себе класичні або спортивні штани, теплі варіанти для прохолодних днів чи легкі літні моделі.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Затишок та комфорт: Штани RIKSI мають зручний крій, який не буде сковувати рухів. Вони ідеально підходять для відпочинку вдома, читання книги, перегляду фільму чи просто для того, щоб відчувати себе комфортно.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Доступні ціни: Ми віримо, що якісний домашній одяг має бути доступним для кожної жінки. Тому пропонуємо штани за приємними цінами.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: Окрім базових моделей, RIKSI пропонує ексклюзивні штани з лімітованих колекцій, які допоможуть вам створити особливий домашній образ.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З домашніми штанами RIKSI ви завжди будете почувати себе комфортно та стильно вдома.</p></div>' },
    ],
  },
  {
    name: 'Трикотажний одяг',
    categoryUrl: 'trykotazhnyi-odiah',
    description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе неповторний світ трикотажного одягу від RIKSI. Ця категорія включає в себе трикотажний одяг, який підкреслять Вашу індивідуальність. Оберіть кардиган, лонгслів, боді, топ, шорти, штани чи панчохи для створення неперевершеного образу. RIKSI допоможе Вам виразити свій стиль та насолоджуватися кожним моментом у стильному вбранні.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">В нашій категорії трикотажного одягу ви знайдете все, що потрібно для створення затишного та стильного образу. Ми пропонуємо широкий асортимент кардиганів, лонгслівів, боді, топів, шортів, штанів та панчох з високоякісних матеріалів, які приємні до тіла та забезпечують комфорт протягом дня.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Чому варто вибрати трикотажний одяг RIKSI?</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Якість: Ми використовуємо лише найкращі матеріали та фурнітуру, щоб гарантувати нашим клієнтам бездоганну якість продукції.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стиль: Наші дизайнери постійно створюють нові, унікальні моделі, які підкреслять вашу індивідуальність.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Різноманіття: У нас ви знайдете трикотажний одяг на будь-який смак та для будь-якої події.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Вигідні пропозиції: Ми часто проводимо розпродажі та акції, щоб ви могли купити улюблений одяг за ще більш вигідною ціною.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З трикотажним одягом RIKSI ви зможете:</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Підкреслити свою фігуру</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Створити затишний та стильний образ</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Відчувати себе впевнено та комфортно протягом дня</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Виразити свою індивідуальність</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Завжди бути в тренді</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Економити час та гроші, купуючи одяг онлайн</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Обирайте RIKSI - ваш стиль, ваш комфорт, ваші вигідні покупки!</p></div>',
    subcategories: [
      { name: 'Кардигани', subcategoryUrl: 'kardihany', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З RIKSI ви завжди можете бути впевнені, що ваш домашній одяг буде не лише затишним, але й стильним. Наші кардигани виготовлені з високоякісних матеріалів, які приємні до тіла та не втрачають форму після прання.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI пропонує широкий вибір кардиганів на будь-який смак: від класичних моделей до модних новинок. Ви можете знайти кардигани різноманітних кольорів, фасонів та довжин, які ідеально підкреслять вашу фігуру.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Лімітовані колекції кардиганів RIKSI - це унікальна можливість створити неповторний образ. Наші дизайнери постійно стежать за останніми модними тенденціями, щоб пропонувати вам найактуальніші моделі.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З кардиганами RIKSI ваш домашній одяг буде не лише затишним, але й стильним!</p></div>' },
      { name: 'Боді', subcategoryUrl: 'body', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Боді — це не лише елемент білизни, але й стильний одяг, який може стати основою для багатьох образів. З RIKSI ви можете бути впевнені, що знайдете боді, яке ідеально підійде саме вам.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ми пропонуємо широкий вибір боді з різних матеріалів, фасонів та кольорів. Ви можете знайти боді, яке підкреслить ваші форми, візуально зменшить талію або просто додасть вашому образу трохи пікантності.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI співпрацює з найкращими дизайнерами, щоб гарантувати вам найвищу якість та комфорт. Наші боді виготовлені з високоякісних матеріалів, які приємні до тіла та не втрачають форму після прання.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Лімітовані колекції боді RIKSI - це унікальна можливість придбати ексклюзивну модель, яка підкреслить вашу індивідуальність. Наші дизайнери постійно створюють нові моделі боді, які відповідають останнім модним тенденціям.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З боді RIKSI ви завжди будете на висоті!</p></div>' },
      { name: 'Панчохи', subcategoryUrl: 'panchokhy', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе світ елегантності та комфорту з RIKSI!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Пориньте у вишукані колекції жіночих панчох RIKSI, де поєднуються витонченість, високоякісні матеріали та сучасний дизайн. Це не просто аксесуар, а впевненість у своїй красі та чарівність у будь-якій ситуації.</p><p style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 10px;">Чому слід обирати жіночі панчохи від RIKSI?</p><ul style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px; padding-left: 20px;"><li style="margin-bottom: 10px;">- Преміум-матеріали: Ми використовуємо лише першокласні тканини, які забезпечують максимальний комфорт, мʼякість та довговічність.</li><li style="margin-bottom: 10px;">- Ідеальна посадка: Завдяки продуманим розмірам та якісним матеріалам панчохи RIKSI чудово сидять на нозі, не зісковзують і дарують відчуття комфорту протягом дня.</li><li style="margin-bottom: 10px;">- Доступні ціни: Ми пропонуємо вигідні ціни на всі моделі, адже вважаємо, що елегантність та комфорт повинні бути доступними для кожної.</li></ul><p style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 10px;">З жіночими панчохами RIKSI ви:</p><ul style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px; padding-left: 20px;"><li style="margin-bottom: 10px;">- Відчуватимете себе впевнено: Вишуканий дизайн та висока якість наших панчох подарують вам відчуття впевненості та неперевершеності.</li><li style="margin-bottom: 10px;">- Підкреслите свою красу: Різноманіття фасонів, кольорів та візерунків дозволить вам підібрати панчохи, які підкреслять ваші ноги та доповнять ваш образ.</li><li style="margin-bottom: 10px;">- Завжди будете в тренді: Колекції RIKSI регулярно оновлюються, тому ви завжди будете в курсі останніх модних тенденцій.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Обирайте RIKSI та насолоджуйтесь бездоганним комфортом та витонченістю у кожному кроці!</p></div>' },
      { name: 'Сукні', subcategoryUrl: 'sukni', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ласкаво просимо до колекції жіночих домашніх суконь від RIKSI! Тут ви знайдете вишукані моделі, які поєднують у собі комфорт та елегантність. Кожна сукня створена з урахуванням сучасних тенденцій моди та виготовлена з матеріалів найвищої якості.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Сукні від RIKSI дозволяють відчувати себе чудово в будь-який час вдома. Вони відзначаються мʼякістю тканин та зручним кроєм, що забезпечує свободу рухів і максимальний комфорт. Наші дизайнерські рішення роблять кожну сукню унікальною, дозволяючи вам виразити свій стиль і індивідуальність навіть у домашньому одязі.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Пориньте у світ комфорту та стилю разом з RIKSI! Обирайте жіночі домашні сукні, що дарують неперевершені відчуття затишку та впевненості. Купуйте зараз і відчуйте різницю!</p></div>' },
      { name: 'Комбінезони', subcategoryUrl: 'kombinezony', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Комбінезони від RIKSI – це поєднання стилю, комфорту та якості. Ми пропонуємо широкий асортимент жіночих комбінезонів, які підкреслять вашу індивідуальність та допоможуть створити унікальний образ. У нашій колекції ви знайдете як класичні, так і трендові моделі, що відповідають останнім модним тенденціям.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Наші комбінезони виготовлені з високоякісних матеріалів, що забезпечують довговічність та комфорт під час носіння. Кожна модель ретельно продумана та виготовлена з любовʼю до деталей, щоб ви могли насолоджуватися бездоганним стилем і комфортом.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI пропонує лімітовані колекції, що гарантує ексклюзивність та унікальність вашого образу. Наші комбінезони ідеально підходять для різних подій – від повсякденного носіння до особливих моментів у вашому житті. Завдяки доступним цінам, кожна жінка може дозволити собі виглядати модно та стильно.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Обирайте комбінезони від RIKSI та відчувайте себе впевнено та привабливо кожного дня. Відкрийте для себе світ якісного жіночого одягу, який підкреслює вашу неповторність та індивідуальність.</p></div>', },
    ],
  },
  {
    name: 'Комбінезони',
    categoryUrl: 'kombinezony',
    description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Комбінезони від RIKSI – це поєднання стилю, комфорту та якості. Ми пропонуємо широкий асортимент жіночих комбінезонів, які підкреслять вашу індивідуальність та допоможуть створити унікальний образ. У нашій колекції ви знайдете як класичні, так і трендові моделі, що відповідають останнім модним тенденціям.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Наші комбінезони виготовлені з високоякісних матеріалів, що забезпечують довговічність та комфорт під час носіння. Кожна модель ретельно продумана та виготовлена з любовʼю до деталей, щоб ви могли насолоджуватися бездоганним стилем і комфортом.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI пропонує лімітовані колекції, що гарантує ексклюзивність та унікальність вашого образу. Наші комбінезони ідеально підходять для різних подій – від повсякденного носіння до особливих моментів у вашому житті. Завдяки доступним цінам, кожна жінка може дозволити собі виглядати модно та стильно.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Обирайте комбінезони від RIKSI та відчувайте себе впевнено та привабливо кожного дня. Відкрийте для себе світ якісного жіночого одягу, який підкреслює вашу неповторність та індивідуальність.</p></div>',
    subcategories: [],
  },
  {
    name: 'Купальники',
    description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">РІКСІ: Купальники, що підкреслять вашу красу</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте елегантний та унікальний купальник, який підкреслить вашу фігуру? Зараз вам сподобаються купальники від RIKSI!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">RIKSI пропонує широкий вибір жіночих купальників на будь-який смак і тип фігури:</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Класичні моделі: для тих, хто цінує елегантність та бездоганність.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Ультрамодні купальники: для тих, хто хоче бути в тренді.</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Лімітовані колекції: для тих, хто прагне ексклюзивності.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Усі купальники RIKSI виготовлені з високоякісних матеріалів, що гарантує їх довговічність, комфорт та бездоганний зовнішній вигляд.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Переваги купальників RIKSI:</p><ul style="padding-left: 20px; margin-bottom: 20px;"><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Підкреслюють переваги фігури</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Забезпечують ідеальну посадку</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Виготовлені з якісних матеріалів</li><li style="text-align: justify; font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 10px;">– Стильні та модні</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З РІКСІ ви завжди будете виглядати неперевершено на пляжі!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе світ якісного жіночого пляжного одягу від RIKSI та підкресліть свою красу та індивідуальність!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Завітайте на сайт RIKSI та оберіть купальник своєї мрії!</p></div>',
    categoryUrl: 'kupalnyky',
    subcategories: [],
  },
  {
    name: 'Спортивний одяг та білизна',
    categoryUrl: 'sportyvnyi-odiah-ta-bilyzna',
    description: '<div class="text"><p style="text-align: justify;">RIKSI — це український бренд, що втілює в собі якість та стиль у спортивному одязі та білизні для сучасних жінок. Наш асортимент включає лонгсліви, майки, топи, трусики, велосипедки, пояси та інше. Ми прагнемо поєднати якість та стиль, пропонуючи клієнтам доступні ціни та лімітовані колекції.</p><br /><p style="text-align: justify;">З RIKSI Ви можете підібрати стильний та комфортний спортивний образ. Нова колекція спортивного одягу має відповідати останнім трендам у жіночій моді. Обирайте улюблені речі та створюйте особливий образ разом з RIKSI.</p></div>',
    subcategories: [
      { name: 'Лонгсліви', subcategoryUrl: 'lonhslivy', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Лонгсліви RIKSI - це не лише одяг, але й вираз вашого стилю та активного способу життя. Наші моделі створені з урахуванням потреб сучасної жінки, яка цінує комфорт, якість та стиль.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Виготовлені з високоякісних матеріалів, наші лонгсліви забезпечують оптимальну теплоізоляцію та вентиляцію, що робить їх ідеальними для активного використання у будь-яку пору року. Ви можете впевнено носити їх під час занять спортом, прогулянок або повсякденних справ, завжди виглядаючи стильно та елегантно.</p><p style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 1px;">Обирайте лонгсліви від RIKSI та додайте свій активний штрих до свого образу. Наші моделі стануть вірним помічником у вашому повсякденному житті, даруючи вам зручність та впевненість у кожному русі.</p></div>' },
      { name: 'Майки', subcategoryUrl: 'maiky', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Майки RIKSI - це не просто одяг, це частина вашого активного стилю життя. Наші моделі створені з урахуванням потреб сучасної жінки, яка цінує якість, комфорт та стиль.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Виготовлені з високоякісних матеріалів, наші майки забезпечують відмінну вентиляцію та комфорт під час будь-яких активностей. Вони ідеально підходять як для спортивних занять, так і для повсякденного носіння, завдяки своєму стильному дизайну та практичності.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333;">Обирайте майки від RIKSI та додайте свій активний стиль життя до свого образу. Наші моделі стануть невідʼємною частиною вашого гардеробу, надійною підтримкою у вашому активному житті.</p></div>' },
      { name: 'Топи', subcategoryUrl: 'topy', description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Топи RIKSI - це не просто одяг, це вираз вашого стилю та активного способу життя. Наші моделі створені з урахуванням потреб сучасної жінки, яка цінує комфорт, якість та стиль.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Виготовлені з високоякісних матеріалів, наші топи забезпечують відмінну вентиляцію та комфорт під час будь-яких активностей. Вони ідеально підходять як для спортивних занять, так і для повсякденного носіння, завдяки своєму стильному дизайну та практичності.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 0px;">Обирайте топи від RIKSI та додайте свій активний стиль до свого образу. Наші моделі стануть невідʼємною частиною вашого гардероба, надійною підтримкою у вашому активному житті.</p>' },
      { name: 'Трусики', subcategoryUrl: 'trusyky', description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Спортивні трусики RIKSI - це ваш найкращий вибір для активного способу життя. Наші моделі розроблені з урахуванням потреб сучасної жінки, яка цінує комфорт та стиль навіть під час тренувань.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Виготовлені з дихаючих матеріалів, наші спортивні трусики забезпечують максимальний комфорт та вентиляцію під час фізичних навантажень. Зручна посадка та стильний дизайн дозволять вам відчувати себе впевнено та стильно в будь-яку мить.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 0px;">Оберіть спортивні трусики від RIKSI та насолоджуйтесь активним життям з комфортом та елегантністю. Наші моделі допоможуть вам досягти максимальних результатів у спорті, забезпечуючи при цьому максимальний комфорт та відчуття впевненості.</p>', },
      { name: 'Велосипедки', subcategoryUrl: 'velosypedky', description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Велосипедки RIKSI - ідеальний вибір для жінок, які цінують комфорт та стиль під час велосипедних пригод. Наші шорти розроблені з урахуванням потреб активних жінок, які люблять тренуватися та відчувати себе впевнено на дорозі.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Виготовлені з високоякісних та дихаючих матеріалів, наші велосипедки забезпечують оптимальний комфорт та вентиляцію під час велопрогулянок. Зручна посадка та стильний дизайн допоможуть вам виглядати елегантно та модно в будь-яку мить.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 0px;">Оберіть велосипедки від RIKSI та насолоджуйтесь активними пригодами з комфортом та елегантністю. Наші моделі допоможуть вам насолоджуватися кожним моментом на дорозі, забезпечуючи максимальний комфорт та відчуття впевненості.</p>', },
      { name: 'Пояси', subcategoryUrl: 'poiasy', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте спортивний пояс, який забезпечить вам максимальний комфорт та підтримку під час тренувань? RIKSI - це те, що вам потрібно!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ми пропонуємо широкий асортимент спортивних поясів для жінок, розроблених з урахуванням потреб активних людей.</p><p style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 10px;">Наші спортивні пояси:</p><ul style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px; padding-left: 20px;"><li style="margin-bottom: 10px;">- Виготовлені з високоякісних та дихаючих матеріалів, які забезпечують комфорт та відведення вологи під час тренувань.</li><li style="margin-bottom: 10px;">- Мають зручну посадку, яка не обмежує рухів.</li><li style="margin-bottom: 10px;">- Стильний дизайн допоможе вам відчувати себе впевнено та стильно під час будь-якого тренування.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Обирайте спортивні пояси RIKSI та насолоджуйтесь тренуваннями без обмежень!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Досягайте своїх цілей з комфортом та підтримкою!</p></div>' },
    ],
  },
  {
    name: 'Аксесуари',
    categoryUrl: 'aksesuary',
    description: '<div class="text"><p style="text-align: justify;">Аксесуари від RIKSI - це ключові деталі, які надаються вам у формі неповторного шарму та вишуканості. У нашому асортименті елегантні рукавички, стильні панчохи, вишукані гартерії та модні пояси — кожен предмет допоможе створити образ, який виділить Вас із натовпом.</p><br /><p style="text-align: justify;">Рукавички від RIKSI надають вашому вигляду вишуканість та елегантність, панчохи створюють чуттєву атмосферу та привабливість, гартері вносять нотку сексуальності, а пояси завершують образ, підкреслюючи вашу фігуру та стиль.</p><br /><p style="text-align: justify;">Завдяки високій якості матеріалів та стильному дизайну, аксесуари від RIKSI залишаться лише прикрашеними Вашим виглядом, а й практичним елементом Вашого гардеробу. Насолоджуйтесь вибором і додайте шарму вашого стилю з аксесуарами від RIKSI.</p></div>',
    subcategories: [
      { name: 'Панчохи', subcategoryUrl: 'panchokhy' },
      { name: 'Рукавички', subcategoryUrl: 'rukavychky', description: '<div class="text"><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Шукаєте вишукані рукавички, які стануть родзинкою вашого образу? RIKSI пропонує саме те, що вам потрібно!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ми створюємо унікальні рукавички з сітки, які не лише доповнять ваш стиль, але й підкреслять вашу красу та жіночність.</p><p style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 10px;">Наші рукавички:</p><ul style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px; padding-left: 20px;"><li style="margin-bottom: 10px;">- виготовлені з високоякісної сітки, яка приємна на дотик та комфортна у носінні;</li><li style="margin-bottom: 10px;">- стануть чудовим доповненням до наших комплектів білизни.</li></ul><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Це аксесуар, який підкреслить вашу індивідуальність та зробить вас неперевершеною.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе світ RIKSI та знайдіть свою ідеальну пару рукавичок!</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">З RIKSI ваша краса сяятиме ще яскравіше!</p></div>' },
      { name: 'Гартери', subcategoryUrl: 'hartery', description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ласкаво просимо до категорії гартерів RIKSI, де елегантність та спокусливість поєднуються у витончених аксесуарах для жінок.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Наші жіночі гартери — це символ жіночності та витонченого стилю. Виготовлені з високоякісних матеріалів, наші гартери додадуть вашому образу неповторного шарму та вишуканості.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Відкрийте для себе асортимент гартерів RIKSI. З нами ваш образ завжди буде особливим, а відчуття — незабутніми.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Незалежно від того, чи шукаєте ви гартери для особливого випадку чи для того, щоб підкреслити свою жіночність у повсякденному житті, в нашому магазині ви знайдете те, що потрібно саме вам.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333;">Завітайте до RIKSI та насолоджуйтесь найкращими аксесуарами.</p>' },
      { name: 'Пояси', subcategoryUrl: 'poyasy', description: '<p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Ласкаво просимо до категорії поясів для жіночої білизни від RIKSI, де стиль поєднується з елегантністю в кожному аксесуарі. Наші пояси — це не лише функціональний елемент, але й важлива деталь вашого образу, яка підкреслює вашу жіночність та стиль.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">Кожен пояс RIKSI - це не лише аксесуар, але й вираз вашої особистості. Додайте елегантності та стилю до свого гардероба з нашими поясами для білизни.</p><p style="text-align: justify; font-size: 16px; line-height: 1.6; color: #333;">Завітайте до нашого магазину та оберіть ідеальний пояс, який відповідає вашому смаку та стилю.</p>' },
    ],
  },
  {
    name: 'Сертифікати',
    description: '<div class="text"><p style="text-align: justify;">Подарунковий сертифікат від RIKSI – це ідеальний варіант, коли ви не можете визначитися, що саме подарувати вашій коханій чи подрузі. За допомогою нашого сертифіката Ви даруєте не лише предмети одягу, а й можливість вибору, адже вона сама зможе обрати щось, що відповідає її стилю та перевагам.</p><p style="text-align: justify;">Наші подарункові сертифікати доступні як у формі електронного документа, так і у вигляді стильного фізичного сертифіката, який можна вручити особисто. Вибір залишається за вами, адже ми прагнемо зробити Ваш подарунок максимально зручним та приємним.</p><p style="text-align: justify;">Подарунковий сертифікат від RIKSI - це можливість отримати щось особливе та якісне, обравши самій те, що подобається. Зробіть свій подарунок ще більш запамʼятовуваним та цінним, обираючи подарунковий сертифікат від RIKSI.</p></div>',
    categoryUrl: 'sertyfikaty',
    subcategories: [],
  },
  {
    name: 'Price Party',
    categoryUrl: 'price-party',
    subcategories: [],
  }
];

const products = [
  {
    name: 'Лонгслів Cream Blue',
    description: 'Неймовірно приємний до тіла Лонгслів Cream Blue виготовлений із мʼякого велсофту. Склад: 100% поліестер.',
    imageUrl: ["https://riksi.ua/content/images/39/1350x1800l95mc0/lonhsliv-cream-blue-94614361536515.webp", "https://riksi.ua/content/images/39/1350x1800l95mc0/lonhsliv-cream-blue-46232639676127.webp"],
    productUrl: 'lonhsliv-cream-blue',
    price: 999,
    oldPrice: 1300,
    sticker: [ProductStickers.NEW],
    currency: 'UAH',
    color: 'Білий',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 6}
    ],
    items: [
      { price: 999, oldPrice: 1300, size: 'XS', sku: 'ЛОНГ-90-XS-BLUE', stock: true },
      { price: 999, oldPrice: 1300, size: 'S', sku: 'ЛОНГ-90-S-BLUE', stock: true },
      { price: 999, oldPrice: 1300, size: 'M', sku: 'ЛОНГ-90-M-BLUE', stock: true },
      { price: 999, oldPrice: 1300, size: 'L', sku: 'ЛОНГ-90-L-BLUE', stock: true },
      { price: 999, oldPrice: 1300, size: 'XL', sku: 'ЛОНГ-90-XL-BLUE', stock: false },
    ],
  },
  {
    name: 'Сукня Weaving Strip Black',
    description: 'Сукня Weaving Strip Black виготовлена​​​із якісного вʼязаного трикотажу. Склад: 50% віскоза, 28% поліестер, 22% нейлон.',
    imageUrl: ["https://riksi.ua/content/images/45/1800x1200l95mc0/suknia-weaving-strip-black-67568079954413.webp"],
    productUrl: 'suknia-weaving-strip-black',
    price: 2340,
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 4}
    ],
    subcategories: [
      {id: 15}
    ],
    items: [
      { price: 2340, size: 'XS', sku: 'СУКН-129-XS-BLACK', stock: false },
      { price: 2340, size: 'S', sku: 'СУКН-129-S-BLACK', stock: false },
      { price: 2340, size: 'M', sku: 'СУКН-129-M-BLACK', stock: false },
      { price: 2340, size: 'L', sku: 'СУКН-129-L-BLACK', stock: true },
      { price: 2340, size: 'XL', sku: 'СУКН-129-XL-BLACK', stock: true },
      { price: 2340, size: 'XXL', sku: 'СУКН-129-XXL-BLACK', stock: false },
    ],
  },
  {
    name: 'Панчохи Element Beige',
    description: 'Панчохи Element Beige виготовлені із якісного фактурного трикотажу на силіконовій резинці. Склад: 95% бавовна 5% еластан.',
    imageUrl: ["https://riksi.ua/content/images/26/579x869l95mc0/panchokhy-element-beige-32621869905873.webp"],
    productUrl: 'panchokhy-element-beige',
    price: 900,
    currency: 'UAH',
    color: 'Молочний',
    categories: [
      {id: 8}
    ],
    subcategories: [
      {id: 23}
    ],
    items: [
      { price: 900, size: 'XXS', sku: 'ПАНЧ-100-XXS-BEIGE', stock: false },
      { price: 900, size: 'XS', sku: 'ПАНЧ-100-XS-BEIGE', stock: false },
      { price: 900, size: 'S', sku: 'ПАНЧ-100-S-BEIGE', stock: true },
      { price: 900, size: 'M', sku: 'ПАНЧ-100-M-BEIGE', stock: false },
      { price: 900, size: 'L', sku: 'ПАНЧ-100-L-BEIGE', stock: true },
      { price: 900, size: 'XL', sku: 'ПАНЧ-100-XL-BEIGE', stock: false },
    ],
  },
  {
    name: 'Боді Panther',
    description: 'Боді Panther виконаний із сітки. Екасличний та приємний до тіла. Склад тканини: 87% поміамід, 13% еластан.',
    imageUrl: ["https://riksi.ua/content/images/16/579x869l95mc0/bodi-panther-96139373557907.webp", "https://riksi.ua/content/images/16/579x869l95mc0/bodi-panther-60951871028438.webp"],
    productUrl: 'bodi-panther',
    sticker: [ProductStickers.NEW],
    price: 1690,
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 2}
    ],
    items: [
      { price: 1490, size: 'XXS', sku: 'БОДІ-92-XXS', stock: true },
      { price: 1490, size: 'XS', sku: 'БОДІ-92-XS', stock: true },
      { price: 1490, size: 'S', sku: 'БОДІ-92-S', stock: true },
      { price: 1490, size: 'M', sku: 'БОДІ-92-M', stock: true },
      { price: 1490, size: 'L', sku: 'БОДІ-92-L', stock: true },
      { price: 1490, size: 'XL', sku: 'БОДІ-92-XL', stock: true },
      { price: 1490, size: 'XXL', sku: 'БОДІ-92-XXL', stock: true },
    ],
  },
  {
    name: 'Лонгслів Toffee Pink',
    description: 'Лонслів Toffee Pink виконаний із ажурного трикотажу. Застібка на кнопках. Склад: 100% бавовна.',
    imageUrl: ["https://riksi.ua/content/images/17/1350x1800l95mc0/lonhsliv-toffee-pink-71827887978917.webp", "https://riksi.ua/content/images/17/1350x1800l95mc0/lonhsliv-toffee-pink-53637608577454.webp"],
    productUrl: 'lonhsliv-toffee-pink',
    price: 1095,
    currency: 'UAH',
    color: 'Рожевий',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 6}
    ],
    items: [
      { price: 1095, size: 'XXS', sku: 'ЛОНГ-15-XXS-PINK', stock: false },
      { price: 1095, size: 'XS', sku: 'ЛОНГ-15-XS-PINK', stock: true },
      { price: 1095, size: 'S', sku: 'ЛОНГ-15-S-PINK', stock: true },
      { price: 1095, size: 'M', sku: 'ЛОНГ-15-M-PINK', stock: true },
      { price: 1095, size: 'L', sku: 'ЛОНГ-15-L-PINK', stock: true },
      { price: 1095, size: 'XL', sku: 'ЛОНГ-15-XL-PINK', stock: false },
      { price: 1095, size: 'XXL', sku: 'ЛОНГ-15-XXL-PINK', stock: false },
    ],
  },
  {
    name: 'Сорочка Flannel Pink',
    description: 'Сорочка Flannel Pink виготовлена із фланелі. 100% бавовна. Вільного краю, має маленьки гудзики та кишеню.',
    imageUrl: ["https://riksi.ua/content/images/31/900x1200l95mc0/sorochka-flannel-pink-80566498004348.webp", "https://riksi.ua/content/images/31/900x1200l95mc0/sorochka-flannel-pink-55224390063475.webp", "https://riksi.ua/content/images/31/900x1200l95mc0/sorochka-flannel-pink-25591550359370.webp", "https://riksi.ua/content/images/31/900x1200l95mc0/sorochka-flannel-pink-59413698129583.webp"],
    productUrl: 'sorochka-flannel-pink',
    price: 1099,
    currency: 'UAH',
    color: 'Рожевий',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 8}
    ],
    items: [
      { price: 1099, size: 'XXS', sku: 'СОРО-89-XXS-PINK', stock: false },
      { price: 1099, size: 'XS', sku: 'СОРО-89-XS-PINK', stock: true },
      { price: 1099, size: 'S', sku: 'СОРО-89-S-PINK', stock: true },
      { price: 1099, size: 'M', sku: 'СОРО-89-M-PINK', stock: true },
      { price: 1099, size: 'L', sku: 'СОРО-89-L-PINK', stock: true },
      { price: 1099, size: 'XL', sku: 'СОРО-89-XL-PINK', stock: false },
      { price: 1099, size: 'XXL', sku: 'СОРО-89-XXL-PINK', stock: false },
    ],
  },
  {
    name: 'Боді Florence',
    description: 'Боді Florence виконаний із мікрофібри. Без чашки, і з металевим фігурним розʼєднувачем та стразами на грудях.  Склад: 81% поліамід, 19% еластан.',
    imageUrl: ["https://riksi.ua/content/images/13/579x869l95mc0/bodi-florence-79259231317260.webp", "https://riksi.ua/content/images/13/579x869l95mc0/bodi-florence-76727086756852.webp"],
    productUrl: 'bodi-florence',
    sticker: [ProductStickers.NEW],
    price: 3390,
    popularity: 600,
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 2}
    ],
    items: [
      { price: 3390, size: 'XXS', sku: 'БОДІ-94-XXS-BLACK', stock: false },
      { price: 3390, size: 'XS', sku: 'БОДІ-94-XS-BLACK', stock: true },
      { price: 3390, size: 'S', sku: 'БОДІ-94-S-BLACK', stock: true },
      { price: 3390, size: 'M', sku: 'БОДІ-94-M-BLACK', stock: true },
      { price: 3390, size: 'L', sku: 'БОДІ-94-L-BLACK', stock: true },
    ],
  },
  {
    name: 'Комбінезон Catsuit Strip Milk',
    description: 'Catsuit Milk виготовлений із якісного вʼязаного трикотажу. Комбінезон під горло, застібка на блискавці. Склад: 50% віскоза, 28% поліестер, 22% нейлон.',
    imageUrl: ["https://riksi.ua/content/images/37/800x1200l95mc0/catsuit-milk-72622019642941.webp", "https://riksi.ua/content/images/37/823x1200l95mc0/catsuit-milk-37312311033826.webp", "https://riksi.ua/content/images/37/800x1200l95mc0/catsuit-milk-26562670090073.webp"],
    productUrl: 'catsuit-milk',
    price: 2690,
    currency: 'UAH',
    color: 'Білий',
    categories: [
      {id: 5}
    ],
    items: [
      { price: 2690, size: 'XXS', sku: 'CATS-129-XXS-MILK', stock: true },
      { price: 2690, size: 'XS', sku: 'CATS-129-XS-MILK', stock: true },
      { price: 2690, size: 'S', sku: 'CATS-129-S-MILK', stock: true },
      { price: 2690, size: 'M', sku: 'CATS-129-M-MILK', stock: true },
      { price: 2690, size: 'L', sku: 'CATS-129-L-MILK', stock: true },
      { price: 2690, size: 'XL', sku: 'CATS-129-XL-MILK', stock: true },
      { price: 2690, size: 'XXL', sku: 'CATS-129-XXL-MILK', stock: true },
    ],
  },
  {
    name: 'Топ Sport Black',
    description: 'Топ Sport Black виготовлений із мікрофібри. Має бретелі на регуляторах та широку еластичну резинку під грудьми. Склад: 81% поліамід, 19% еластан.',
    imageUrl: ["https://riksi.ua/content/images/35/899x1200l95mc0/top-sport-black-64649757836152.webp", "https://riksi.ua/content/images/35/899x1200l95mc0/top-sport-black-79544382625355.webp", "https://riksi.ua/content/images/35/899x1200l95mc0/top-sport-black-13860386171744.webp"],
    productUrl: 'top-sport-black',
    price: 499,
    oldPrice: 695,
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 7}
    ],
    subcategories: [
      {id: 19}
    ],
    items: [
      { price: 499, oldPrice: 695, size: 'XXS', sku: 'ТОП-5-XXS-BLACK', stock: true },
      { price: 499, oldPrice: 695, size: 'XS', sku: 'ТОП-5-XS-BLACK', stock: true },
      { price: 499, oldPrice: 695, size: 'S', sku: 'ТОП-5-S-BLACK', stock: true },
      { price: 499, oldPrice: 695, size: 'M', sku: 'ТОП-5-M-BLACK', stock: true },
      { price: 499, oldPrice: 695, size: 'L', sku: 'ТОП-5-L-BLACK', stock: true },
      { price: 499, oldPrice: 695, size: 'XL', sku: 'ТОП-5-XL-BLACK', stock: true },
      { price: 499, oldPrice: 695, size: 'XXL', sku: 'ТОП-5-XXL-BLACK', stock: true },
    ],
  },
  {
    name: 'Набір трусиків Prime',
    description: 'Трусики Prime виготовлені із 100% бавовни. Ідеальний набір для чутливої шкіри, схильний до алергії. Економія 38%. Ціна комплекту за 5 одиниць 1995 грн замість 3225 грн. Оберіть бажані кольори та моделі трусиків під час оформлення замовлення.',
    imageUrl: ["https://riksi.ua/content/images/16/579x869l95mc0/nabir-trusykiv-prime-99506573618922.webp", "https://riksi.ua/content/images/16/579x869l95mc0/nabir-trusykiv-prime-63782805826069.webp"],
    productUrl: 'nabir-trusykiv-prime',
    sticker: [ProductStickers.NEW],
    price: 1995,
    currency: 'UAH',
    color: 'Білий',
    categories: [
      {id: 1}
    ],
    subcategories: [
      {id: 2}
    ],
    items: [
      { price: 1995, size: 'XXS', sku: 'КОСТ-100-XXS', stock: true },
      { price: 1995, size: 'XS', sku: 'КОСТ-100-XS', stock: true },
      { price: 1995, size: 'S', sku: 'КОСТ-100-S', stock: true },
      { price: 1995, size: 'M', sku: 'КОСТ-100-M', stock: true },
      { price: 1995, size: 'L', sku: 'КОСТ-100-L', stock: true },
    ],
  },
  {
    name: 'Кардиган Weaving Braid Grey',
    description: 'Кардиган Weaving Braid Grey виготовлений із якісного вʼязаного трикотажу. Вільного крою,можна застібати на кнопки, має дві кишені. Склад: 50% віскоза, 28% поліестер, 22% нейлон.',
    imageUrl: ["https://riksi.ua/content/images/6/579x869l95mc0/kardyhan-weaving-braid-grey-63087686227103.webp", "https://riksi.ua/content/images/6/579x869l95mc0/kardyhan-weaving-braid-grey-90746977726715.webp", "https://riksi.ua/content/images/6/579x869l95mc0/kardyhan-weaving-braid-grey-67975802095638.webp"],
    productUrl: 'kardyhan-weaving-braid-grey',
    price: 1790,
    currency: 'UAH',
    color: 'Білий',
    categories: [
      {id: 4}
    ],
    subcategories: [
      {id: 12}
    ],
    items: [
      { price: 1790, size: 'XXS', sku: 'КАРД-128-XXS-GREY', stock: true },
      { price: 1790, size: 'XS', sku: 'КАРД-128-XS-GREY', stock: true },
      { price: 1790, size: 'S', sku: 'КАРД-128-S-GREY', stock: true },
      { price: 1790, size: 'M', sku: 'КАРД-128-M-GREY', stock: true },
      { price: 1790, size: 'L', sku: 'КАРД-128-L-GREY', stock: true },
      { price: 1790, size: 'XL', sku: 'КАРД-128-XL-GREY', stock: true },
      { price: 1790, size: 'XXL', sku: 'КАРД-128-XXL-GREY', stock: false },
    ],
  },
  {
    name: 'Лонгслів Toffee Milk',
    description: 'Лонгслів Toffee Milk виконаний із ажурного трикотажу. Застібка на кнопках. Склад: 100% бавовна.',
    imageUrl: ["https://riksi.ua/content/images/50/1350x1800l95mc0/lonhsliv-toffee-milk-57254737086494.webp", "https://riksi.ua/content/images/50/1350x1800l95mc0/lonhsliv-toffee-milk-87531679501007.webp"],
    productUrl: 'lonhsliv-toffee-milk',
    price: 1095,
    currency: 'UAH',
    sticker: [ProductStickers.NEW],
    color: 'Білий',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 6}
    ],
    items: [
      { price: 1095, size: 'XXS', sku: 'ЛОНГ-15-XXS-MILK', stock: false },
      { price: 1095, size: 'XS', sku: 'ЛОНГ-15-XS-MILK', stock: true },
      { price: 1095, size: 'S', sku: 'ЛОНГ-15-S-MILK', stock: true },
      { price: 1095, size: 'M', sku: 'ЛОНГ-15-M-MILK', stock: true },
      { price: 1095, size: 'L', sku: 'ЛОНГ-15-L-MILK', stock: true },
      { price: 1095, size: 'XL', sku: 'ЛОНГ-15-XL-MILK', stock: true },
      { price: 1095, size: 'XXL', sku: 'ЛОНГ-15-XXL-MILK', stock: true },
    ],
  },
  {
    name: 'Боді Bunny Black',
    description: 'Боді Bunny Black виготовлений із якісного ворсового трикотажу. Боді під горло, застібка на кнопках. Склад: 100% поліестер.',
    imageUrl: ["https://riksi.ua/content/images/50/695x869l95mc0/67089513468042.webp", "https://riksi.ua/content/images/50/695x869l95mc0/99517024293429.webp"],
    productUrl: 'bodi-bunny-black',
    price: 1590,
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 2}, {id: 4}
    ],
    subcategories: [
      {id: 13}
    ],
    items: [
      { price: 1590, size: 'XXS', sku: 'БОДІ-101-XXS-BLACK', stock: false },
      { price: 1590, size: 'XS', sku: 'БОДІ-101-XS-BLACK', stock: false },
      { price: 1590, size: 'S', sku: 'БОДІ-101-S-BLACK', stock: true },
      { price: 1590, size: 'M', sku: 'БОДІ-101-M-BLACK', stock: true },
      { price: 1590, size: 'L', sku: 'БОДІ-101-L-BLACK', stock: true },
      { price: 1590, size: 'XL', sku: 'БОДІ-101-XL-BLACK', stock: true },
      { price: 1590, size: 'XXL', sku: 'БОДІ-101-XXL-BLACK', stock: true },
    ],
  },
  {
    name: 'Сукня Weaving Strip Milk',
    description: 'Сукня Weaving Strip Milk виготовлена ​​із якісного вʼязаного трикотажу. Склад: 50% віскоза, 28% поліестер, 22% нейлон.',
    imageUrl: ["https://riksi.ua/content/images/48/579x869l95mc0/suknia-weaving-strip-milk-59179461492230.webp", "https://riksi.ua/content/images/48/579x869l95mc0/suknia-weaving-strip-milk-71033761827227.webp", "https://riksi.ua/content/images/48/579x869l95mc0/suknia-weaving-strip-milk-70050667689322.webp", "https://riksi.ua/content/images/48/579x869l95mc0/suknia-weaving-strip-milk-71110064473617.webp"],
    productUrl: 'suknia-weaving-strip-milk',
    price: 2690,
    popularity: 590,
    currency: 'UAH',
    sticker: [ProductStickers.NEW],
    color: 'Білий',
    categories: [
      {id: 4}
    ],
    subcategories: [
      {id: 15}
    ],
    items: [
      { price: 2690, size: 'XXS', sku: 'СУКН-129-XXS-MILK', stock: true },
      { price: 2690, size: 'XS', sku: 'СУКН-129-XS-MILK', stock: true },
      { price: 2690, size: 'S', sku: 'СУКН-129-S-MILK', stock: true },
      { price: 2690, size: 'M', sku: 'СУКН-129-M-MILK', stock: true },
      { price: 2690, size: 'L', sku: 'СУКН-129-L-MILK', stock: true },
      { price: 2690, size: 'XL', sku: 'СУКН-129-XL-MILK', stock: true },
      { price: 2690, size: 'XXL', sku: 'СУКН-129-XXL-MILK', stock: true },
    ],
  },
  {
    name: 'Сорочка Christmas',
    description: 'Сорочка Різдвяна виготовлена ​​із шовку. 100% поліестер. Вільного краю, має маленькі гудзики та кишеню.',
    imageUrl: ["https://riksi.ua/content/images/34/579x869l95mc0/sorochka-christmas-37157504577205.webp", "https://riksi.ua/content/images/34/579x869l95mc0/sorochka-christmas-80260700329199.webp", "https://riksi.ua/content/images/34/579x869l95mc0/sorochka-christmas-21153911909795.webp"],
    productUrl: 'sorochka-christmas',
    price: 1095,
    popularity: 550,
    currency: 'UAH',
    sticker: [ProductStickers.HITS],
    color: 'Червоний',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 8}
    ],
    items: [
      { price: 1095, size: 'XXS', sku: 'СОРО-70-XXS-CHRISTMAS', stock: true },
      { price: 1095, size: 'XS', sku: 'СОРО-70-XS-CHRISTMAS', stock: true },
      { price: 1095, size: 'S', sku: 'СОРО-70-S-CHRISTMAS', stock: true },
      { price: 1095, size: 'M', sku: 'СОРО-70-M-CHRISTMAS', stock: true },
      { price: 1095, size: 'L', sku: 'СОРО-70-L-CHRISTMAS', stock: true },
      { price: 1095, size: 'XL', sku: 'СОРО-70-XL-CHRISTMAS', stock: true },
      { price: 1095, size: 'XXL', sku: 'СОРО-70-XXL-CHRISTMAS', stock: true },
    ],
  },
  {
    name: 'Штани Christmas',
    description: 'Штани різдвяні виготовлені із шовку. 100% поліестер. Вільного крою, мають пояс з імітацією трусиків з еластичною резинкою. Також мають дві кишені.',
    imageUrl: ["https://riksi.ua/content/images/41/579x869l95mc0/shtany-christmas-11755170269971.webp", "https://riksi.ua/content/images/41/579x869l95mc0/shtany-christmas-95440958206923.webp"],
    productUrl: 'shtany-christmas',
    price: 1095,
    popularity: 540,
    currency: 'UAH',
    sticker: [ProductStickers.HITS],
    color: 'Червоний',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 11}
    ],
    items: [
      { price: 1095, size: 'XXS', sku: 'ШТАН-70-XXS-CHRISTMAS', stock: true },
      { price: 1095, size: 'XS', sku: 'ШТАН-70-XS-CHRISTMAS', stock: true },
      { price: 1095, size: 'S', sku: 'ШТАН-70-S-CHRISTMAS', stock: true },
      { price: 1095, size: 'M', sku: 'ШТАН-70-M-CHRISTMAS', stock: true },
      { price: 1095, size: 'L', sku: 'ШТАН-70-L-CHRISTMAS', stock: true },
      { price: 1095, size: 'XL', sku: 'ШТАН-70-XL-CHRISTMAS', stock: true },
      { price: 1095, size: 'XXL', sku: 'ШТАН-70-XXL-CHRISTMAS', stock: true },
    ],
  },
  {
    name: 'Сорочка Marshmallow Black',
    description: 'Сорочка Marshmallow Black виготовлена ​​з ажурного трикотажу. Легка та приємна до тіла. Бретелі на регуляторах. Склад 100% бавовна.',
    imageUrl: ["https://riksi.ua/content/images/35/579x869l95mc0/sorochka-marshmallow-black-42887585153711.webp", "https://riksi.ua/content/images/35/579x869l95mc0/sorochka-marshmallow-black-51831914132632.webp"],
    productUrl: 'sorochka-marshmallow-black',
    price: 1395,
    sticker: [ProductStickers.HITS],
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 8}
    ],
    items: [
      { price: 1395, size: 'XXS', sku: 'СОРО-12-XXS-BLACK', stock: true },
      { price: 1395, size: 'XS', sku: 'СОРО-12-XS-BLACK', stock: true },
      { price: 1395, size: 'S', sku: 'СОРО-12-S-BLACK', stock: true },
      { price: 1395, size: 'M', sku: 'СОРО-12-M-BLACK', stock: true },
      { price: 1395, size: 'L', sku: 'СОРО-12-L-BLACK', stock: true },
      { price: 1395, size: 'XL', sku: 'СОРО-12-XL-BLACK', stock: true },
      { price: 1395, size: 'XXL', sku: 'СОРО-12-XXL-BLACK', stock: true },
    ],
  },
  {
    name: 'Халат Pride',
    description: 'Халат Pride виконані із шовку та мережива. Склад: 97% поліестер, 3% еластан.',
    imageUrl: ["https://riksi.ua/content/images/2/1350x1800l95mc0/shorty-pride5551-47247411536223.webp", "https://riksi.ua/content/images/2/1350x1800l95mc0/shorty-pride5551-18471188007041.webp"],
    productUrl: 'khalat-pride',
    price: 1195,
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 9}
    ],
    items: [
      { price: 1195, size: 'XXS', sku: 'ХАЛА-14-XXS', stock: true },
      { price: 1195, size: 'XS', sku: 'ХАЛА-14-XS', stock: true },
      { price: 1195, size: 'S', sku: 'ХАЛА-14-S', stock: true },
      { price: 1195, size: 'M', sku: 'ХАЛА-14-M', stock: true },
      { price: 1195, size: 'L', sku: 'ХАЛА-14-L', stock: true },
      { price: 1195, size: 'XL', sku: 'ХАЛА-14-XL', stock: true },
      { price: 1195, size: 'XXL', sku: 'ХАЛА-14-XXL', stock: true },
    ],
  },
  {
    name: 'Майка Rose Milk',
    description: 'Майка Rose Milk виконана із трикотажного рубчика. Бретелі на регуляторах. Склад: 95% бавовна, 5% еластан.',
    imageUrl: ["https://riksi.ua/content/images/31/1350x1800l95mc0/maika-rose-milk-72552290315614.webp", "https://riksi.ua/content/images/31/1350x1800l95mc0/maika-rose-milk-19105375238366.webp", "https://riksi.ua/content/images/31/1350x1800l95mc0/maika-rose-milk-97193022490137.webp"],
    productUrl: 'maika-rose-milk',
    price: 795,
    sticker: [ProductStickers.HITS],
    currency: 'UAH',
    color: 'Молочний',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 4}
    ],
    items: [
      { price: 795, size: 'XXS', sku: 'МАЙК-13-XXS-MILK', stock: true },
      { price: 795, size: 'XS', sku: 'МАЙК-13-XS-MILK', stock: true },
      { price: 795, size: 'S', sku: 'МАЙК-13-S-MILK', stock: true },
      { price: 795, size: 'M', sku: 'МАЙК-13-M-MILK', stock: true },
      { price: 795, size: 'L', sku: 'МАЙК-13-L-MILK', stock: true },
      { price: 795, size: 'XL', sku: 'МАЙК-13-XL-MILK', stock: true },
      { price: 795, size: 'XXL', sku: 'МАЙК-13-XXL-MILK', stock: true },
    ],
  },
  {
    name: 'Комбінезон Slim Grey',
    description: 'Комбінезон Slim Grey виконаний із трикотажу. Застібка на кнопках. Склад: 95% бавовна, 5% лайкра.',
    imageUrl: ["https://riksi.ua/content/images/14/1350x1800l95mc0/kombinezon-slim-grey-17664604096070.webp", "https://riksi.ua/content/images/14/1350x1800l95mc0/kombinezon-slim-grey-84439971842151.webp"],
    productUrl: 'kombinezon-slim-grey',
    sticker: [ProductStickers.HITS],
    price: 2190,
    popularity: 400,
    currency: 'UAH',
    color: 'Молочний',
    categories: [
      {id: 5}
    ],
    items: [
      { price: 2190, size: 'XXS', sku: 'КОМБ-100-XXS-GREY', stock: true },
      { price: 2190, size: 'XS', sku: 'КОМБ-100-XS-GREY', stock: true },
      { price: 2190, size: 'S', sku: 'КОМБ-100-S-GREY', stock: true },
      { price: 2190, size: 'M', sku: 'КОМБ-100-M-GREY', stock: true },
      { price: 2190, size: 'L', sku: 'КОМБ-100-L-GREY', stock: true },
      { price: 2190, size: 'XL', sku: 'КОМБ-100-XL-GREY', stock: true },
      { price: 2190, size: 'XXL', sku: 'КОМБ-100-XXL-GREY', stock: true },
    ],
  },
  {
    name: 'Сорочка Prime Red',
    description: 'Сорочка Prime Red виготовлена ​із ажурного трикотажу. Легка та приємна до тіла. Бретелі на регуляторах. Склад 100% бавовна.',
    imageUrl: ["https://riksi.ua/content/images/18/1350x1800l95mc0/sorochka-prime-red-34068075698017.webp", "https://riksi.ua/content/images/18/1350x1800l95mc0/sorochka-prime-red-95817071260404.webp"],
    productUrl: 'sorochka-prime-red',
    price: 1295,
    currency: 'UAH',
    sticker: [ProductStickers.HITS],
    color: 'Червоний',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 8}
    ],
    items: [
      { price: 1295, size: 'XXS', sku: 'СОРО-10-XXS-RED', stock: true },
      { price: 1295, size: 'XS', sku: 'СОРО-10-XS-RED', stock: true },
      { price: 1295, size: 'S', sku: 'СОРО-10-S-RED', stock: true },
      { price: 1295, size: 'M', sku: 'СОРО-10-M-RED', stock: true },
      { price: 1295, size: 'L', sku: 'СОРО-10-L-RED', stock: true },
      { price: 1295, size: 'XL', sku: 'СОРО-10-XL-RED', stock: true },
      { price: 1295, size: 'XXL', sku: 'СОРО-10-XXL-RED', stock: true },
    ],
  },
  {
    name: 'Спідниця Extra Pink',
    description: 'Спідниця Extra Pink виконана із біфлексу.',
    imageUrl: ["https://riksi.ua/content/images/11/1350x1800l95mc0/spidnytsia-extra-pink-47777478656767.webp", "https://riksi.ua/content/images/11/1350x1800l95mc0/spidnytsia-extra-pink-17683562761811.webp"],
    productUrl: 'spidnytsia-extra-pink',
    price: 1490,
    currency: 'UAH',
    color: 'Рожевий',
    categories: [
      {id: 6}
    ],
    items: [
      { price: 1490, size: 'XXS', sku: 'СПІД-92-XXS-PINK', stock: true },
      { price: 1490, size: 'XS', sku: 'СПІД-92-XS-PINK', stock: true },
      { price: 1490, size: 'S', sku: 'СПІД-92-S-PINK', stock: true },
      { price: 1490, size: 'M', sku: 'СПІД-92-M-PINK', stock: true },
      { price: 1490, size: 'L', sku: 'СПІД-92-L-PINK', stock: true },
    ],
  },
  {
    name: 'Халат Prime Milk',
    description: 'Халат Prime Milk виготовлений із ажурного трикотажу. Легкий та приємний до тіла. Склад 100% бавовна.',
    imageUrl: ["https://riksi.ua/content/images/9/1343x1800l95mc0/khalat-prime-milk-42468205036167.webp", "https://riksi.ua/content/images/9/1350x1800l95mc0/khalat-prime-milk-79389027559277.webp"],
    productUrl: 'khalat-prime-milk',
    sticker: [ProductStickers.NEW],
    price: 1495,
    currency: 'UAH',
    color: 'Молочний',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 9}
    ],
    items: [
      { price: 1495, size: 'XXS', sku: 'ХАЛА-10-XXS-MILK', stock: true },
      { price: 1495, size: 'XS', sku: 'ХАЛА-10-XS-MILK', stock: true },
      { price: 1495, size: 'S', sku: 'ХАЛА-10-S-MILK', stock: true },
      { price: 1495, size: 'M', sku: 'ХАЛА-10-M-MILK', stock: true },
      { price: 1495, size: 'L', sku: 'ХАЛА-10-L-MILK', stock: false },
      { price: 1495, size: 'XL', sku: 'ХАЛА-10-XL-MILK', stock: true },
      { price: 1495, size: 'XXL', sku: 'ХАЛА-10-XXL-MILK', stock: true },
    ],
  },
  {
    name: 'Боді Element Milk',
    description: 'Боді Element Milk виготовлений із якісного фактурного трикотажу. Боді під горло, застібка на кнопках. Склад: 95% бавовна 5% еластан.',
    imageUrl: ["https://riksi.ua/content/images/5/579x869l95mc0/bodi-element-milk-18461217414521.webp", "https://riksi.ua/content/images/5/579x869l95mc0/bodi-element-milk-87273119629545.webp"],
    productUrl: 'bodi-element-milk',
    price: 1490,
    currency: 'UAH',
    color: 'Молочний',
    categories: [
      {id: 2}
    ],
    items: [
      { price: 1490, size: 'XXS', sku: 'БОДІ-100-XXS-MILK', stock: true },
      { price: 1490, size: 'XS', sku: 'БОДІ-100-XS-MILK', stock: true },
      { price: 1490, size: 'S', sku: 'БОДІ-100-S-MILK', stock: true },
      { price: 1490, size: 'M', sku: 'БОДІ-100-M-MILK', stock: true },
      { price: 1490, size: 'L', sku: 'БОДІ-100-L-MILK', stock: true },
      { price: 1490, size: 'XL', sku: 'БОДІ-100-XL-MILK', stock: true },
      { price: 1490, size: 'XXL', sku: 'БОДІ-100-XXL-MILK', stock: true },
    ],
  },
  {
    name: 'Боді Venus Black',
    description: 'Боді Venus Black виготовлений із мікрофібри. Має чашку з push-up та застібку на кнопках. Склад: 81% поліамід, 19% еластан.',
    imageUrl: ["https://riksi.ua/content/images/11/800x1200l95mc0/bodi-venus-black-64360389183909.webp", "https://riksi.ua/content/images/11/800x1200l95mc0/bodi-venus-black-12919926714062.webp", "https://riksi.ua/content/images/11/800x1200l95mc0/bodi-venus-black-64606770476680.webp"],
    productUrl: 'bodi-venus-black',
    price: 3095,
    sticker: [ProductStickers.HITS],
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 2}
    ],
    items: [
      { price: 3095, size: 'XXS', sku: 'БОДІ-67-XXS-MILK', stock: true },
      { price: 3095, size: 'XS', sku: 'БОДІ-67-XS-MILK', stock: true },
      { price: 3095, size: 'S', sku: 'БОДІ-67-S-MILK', stock: true },
      { price: 3095, size: 'M', sku: 'БОДІ-67-M-MILK', stock: true },
      { price: 3095, size: 'L', sku: 'БОДІ-67-L-MILK', stock: true },
      { price: 3095, size: 'XL', sku: 'БОДІ-67-XL-MILK', stock: true },
      { price: 3095, size: 'XXL', sku: 'БОДІ-67-XXL-MILK', stock: true },
    ],
  },
  {
    name: 'Піжама Love',
    description: 'Піжама Love виконана зі штапелем. Сорочка гудзиках. Топ на бретелях. Спідниця на запах. Склад: Віскоза 100%',
    imageUrl: ["https://riksi.ua/content/images/19/579x869l95mc0/pizhama-love-96740179813313.webp", "https://riksi.ua/content/images/19/579x869l95mc0/pizhama-love-13139483637307.webp", "https://riksi.ua/content/images/19/579x869l95mc0/pizhama-love-63686346160497.webp"],
    productUrl: 'pizhama-love',
    price: 2570,
    sticker: [ProductStickers.PRICEPARTY],
    currency: 'UAH',
    color: 'Рожевий',
    categories: [
      {id: 3},
      {id: 10}
    ],
    items: [
      { price: 2570, size: 'XXS', sku: 'ПІЖА-21-XXS', stock: true },
      { price: 2570, size: 'XS', sku: 'ПІЖА-21-XS', stock: true },
      { price: 2570, size: 'S', sku: 'ПІЖА-21-S', stock: true },
      { price: 2570, size: 'M', sku: 'ПІЖА-21-M', stock: true },
      { price: 2570, size: 'L', sku: 'ПІЖА-21-L', stock: true },
    ],
  },
  {
    name: 'Лонгслів Floret Mustard',
    description: 'Лонгслів Floret Mustard, виконаний із трикотажу. Склад: 100% бавовна.',
    imageUrl: ["https://riksi.ua/content/images/45/579x869l95mc0/lonhsliv-floret-mustard-80472709007188.webp", "https://riksi.ua/content/images/45/579x869l95mc0/lonhsliv-floret-mustard-53862407817150.webp"],
    productUrl: 'lonhsliv-floret-mustard',
    price: 1195,
    currency: 'UAH',
    color: 'Білий',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 6}
    ],
    items: [
      { price: 1195, size: 'XXS', sku: 'ЛОНГ-10-XXS-MUSTARD', stock: true },
      { price: 1195, size: 'XS', sku: 'ЛОНГ-10-XS-MUSTARD', stock: true },
      { price: 1195, size: 'S', sku: 'ЛОНГ-10-S-MUSTARD', stock: true },
      { price: 1195, size: 'M', sku: 'ЛОНГ-10-M-MUSTARD', stock: true },
      { price: 1195, size: 'L', sku: 'ЛОНГ-10-L-MUSTARD', stock: true },
      { price: 1195, size: 'XL', sku: 'ЛОНГ-10-XL-MUSTARD', stock: true },
      { price: 1195, size: 'XXL', sku: 'ЛОНГ-10-XXL-MUSTARD', stock: true },
    ],
  },
  {
    name: 'Топ Bagira',
    description: 'Топ Bagira виконаний зі штапелем. Бретелі на регуляторах. Склад: 100% бавовна.',
    imageUrl: ["https://riksi.ua/content/images/40/1350x1800l95mc0/top-bagira-88779320718301.webp", "https://riksi.ua/content/images/40/1350x1800l95mc0/top-bagira-25401600598025.webp"],
    productUrl: 'top-bagira',
    price: 595,
    sticker: [ProductStickers.PRICEPARTY],
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 3},
      {id: 10}
    ],
    subcategories: [
      {id: 4}
    ],
    items: [
      { price: 595, size: 'XXS', sku: 'БЮСТ-121-XXS-LEO', stock: true },
      { price: 595, size: 'XS', sku: 'БЮСТ-121-XS-LEO', stock: true },
      { price: 595, size: 'S', sku: 'БЮСТ-121-S-LEO', stock: true },
      { price: 595, size: 'M', sku: 'БЮСТ-121-M-LEO', stock: true },
      { price: 595, size: 'L', sku: 'БЮСТ-121-L-LEO', stock: true },
    ],
  },
  {
    name: 'Шорти Prime White',
    description: 'Шортики Prime White виконані із ажурного трикотажу. Склад: 100% бавовна.',
    imageUrl: ["https://riksi.ua/content/images/31/1050x1400l95mc0/shorty-prime-white-97887541544908.webp", "https://riksi.ua/content/images/31/1093x1400l95mc0/shorty-prime-white-19000300725353.webp", "https://riksi.ua/content/images/31/1050x1400l95mc0/shorty-prime-white-63335654787484.webp", "https://riksi.ua/content/images/31/1050x1400l95mc0/shorty-prime-white-43872035151005.webp"],
    productUrl: 'shorty-prime-white',
    price: 795,
    currency: 'UAH',
    color: 'Білий',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 10}
    ],
    items: [
      { price: 795, size: 'XXS', sku: 'ШОРТ-10-XXS-WHITE', stock: true },
      { price: 795, size: 'XS', sku: 'ШОРТ-10-XS-WHITE', stock: true },
      { price: 795, size: 'S', sku: 'ШОРТ-10-S-WHITE', stock: true },
      { price: 795, size: 'M', sku: 'ШОРТ-10-M-WHITE', stock: true },
      { price: 795, size: 'L', sku: 'ШОРТ-10-L-WHITE', stock: true },
      { price: 795, size: 'XL', sku: 'ШОРТ-10-XL-WHITE', stock: true },
      { price: 795, size: 'XXL', sku: 'ШОРТ-10-XXL-WHITE', stock: true },
    ],
  },
  {
    name: 'Піжама Daisy Peachy',
    description: 'Піжама Daisy Peachy виконана з натуральної тканини - 100% бавовна. Сорочка на запах з поясом, топ на бретелях та шортики вільного крою.',
    imageUrl: ["https://riksi.ua/content/images/27/1050x1400l95mc0/pizhama-daisy-peachy-51071319445448.webp", "https://riksi.ua/content/images/27/1050x1400l95mc0/pizhama-daisy-peachy-27363580785233.webp", "https://riksi.ua/content/images/27/1050x1400l95mc0/pizhama-daisy-peachy-68002982954941.webp", "https://riksi.ua/content/images/27/1050x1400l95mc0/pizhama-daisy-peachy-53375987056605.webp"],
    productUrl: 'pizhama-daisy-peachy',
    price: 2770,
    currency: 'UAH',
    color: 'Рожевий',
    categories: [
      {id: 3}
    ],
    items: [
      { price: 2770, size: 'XXS', sku: 'ПІЖАМ-10-XXS-PEACHY', stock: true },
      { price: 2770, size: 'XS', sku: 'ПІЖАМ-10-XS-PEACHY', stock: true },
      { price: 2770, size: 'S', sku: 'ПІЖАМ-10-S-PEACHY', stock: true },
      { price: 2770, size: 'M', sku: 'ПІЖАМ-10-M-PEACHY', stock: true },
      { price: 2770, size: 'L', sku: 'ПІЖАМ-10-L-PEACHY', stock: false },
    ],
  },
  {
    name: 'Комбінезон Shape Black',
    description: 'Комбінезон Shape Black - це деальне рішення для продуктивних буднів та гарних вихідних.',
    imageUrl: ["https://riksi.ua/content/images/36/800x1200l95mc0/kombinezon-shape-black-78685448766093.webp", "https://riksi.ua/content/images/36/800x1200l95mc0/kombinezon-shape-black-83342187519697.webp", "https://riksi.ua/content/images/36/800x1200l95mc0/kombinezon-shape-black-88793007734578.webp"],
    productUrl: 'kombinezon-shape-black',
    price: 3390,
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 5},
      {id: 4}
    ],
    subcategories: [
      {id: 16}
    ],
    items: [
      { price: 3390, size: 'XXS', sku: 'CATS-132-XXS-BLACK', stock: true },
      { price: 3390, size: 'XS', sku: 'CATS-132-XS-BLACK', stock: true },
      { price: 3390, size: 'S', sku: 'CATS-132-S-BLACK', stock: true },
      { price: 3390, size: 'M', sku: 'CATS-132-M-BLACK', stock: true },
      { price: 3390, size: 'L', sku: 'CATS-132-L-BLACK', stock: true },
    ],
  },
  {
    name: 'Лонгслів Base Milk',
    description: 'Лонгслів Base виготовлений із мікрофібри. Однотонний лонгслів з довгими рукавами. Базова модель приталеного крою. Склад: 81% поліамід, 19% еластан.',
    imageUrl: ["https://riksi.ua/content/images/16/1200x1800l95mc0/lonhsliv-base-milk-34943339191866.webp", "https://riksi.ua/content/images/16/1200x1800l95mc0/lonhsliv-base-milk-77842169401087.webp", "https://riksi.ua/content/images/16/1200x1800l95mc0/lonhsliv-base-milk-97034907845509.webp", "https://riksi.ua/content/images/16/1200x1800l95mc0/lonhsliv-base-milk-82479384406250.webp"],
    productUrl: 'lonhsliv-base-milk',
    price: 1090,
    currency: 'UAH',
    sticker: [ProductStickers.PRICEPARTY],
    color: 'Молочний',
    categories: [
      {id: 7},
      {id: 10}
    ],
    subcategories: [
      {id: 17}
    ],
    items: [
      { price: 1090, size: 'XXS', sku: 'ЛОНГ-112-XXS-PINK', stock: true },
      { price: 1090, size: 'XS', sku: 'ЛОНГ-112-XS-PINK', stock: true },
      { price: 1090, size: 'S', sku: 'ЛОНГ-112-S-PINK', stock: true },
      { price: 1090, size: 'M', sku: 'ЛОНГ-112-M-PINK', stock: true },
      { price: 1090, size: 'L', sku: 'ЛОНГ-112-L-PINK', stock: true },
      { price: 1090, size: 'XL', sku: 'ЛОНГ-112-XL-PINK', stock: true },
      { price: 1090, size: 'XXL', sku: 'ЛОНГ-112-XXL-PINK', stock: true },
    ],
  },
  {
    name: 'Шорти Balmy Beige',
    description: 'Шорти Balmy Beige виготовлені із якісного вʼязаного трикотажу. Мʼякі та приємні до тіла з еластично резинкою на поясі. Склад: 50% бавовна, 25% поліестер, 25% нейлон.',
    imageUrl: ["https://riksi.ua/content/images/5/900x1200l95mc0/shorty-balmy-beige-11425667946312.webp", "https://riksi.ua/content/images/5/900x1200l95mc0/shorty-balmy-beige-89632013457208.webp", "https://riksi.ua/content/images/5/900x1200l95mc0/shorty-balmy-beige-61133112709251.webp"],
    productUrl: 'shorty-balmy-beige',
    price: 695,
    currency: 'UAH',
    sticker: [ProductStickers.PRICEPARTY],
    color: 'Молочний',
    categories: [
      {id: 3},
      {id: 10}
    ],
    subcategories: [
      {id: 10}
    ],
    items: [
      { price: 695, size: 'XXS', sku: 'ШОРТ-109-XXS-BEIGE', stock: true },
      { price: 695, size: 'XS', sku: 'ШОРТ-109-XS-BEIGE', stock: true },
      { price: 695, size: 'S', sku: 'ШОРТ-109-S-BEIGE', stock: true },
      { price: 695, size: 'M', sku: 'ШОРТ-109-M-BEIGE', stock: true },
      { price: 695, size: 'L', sku: 'ШОРТ-109-L-BEIGE', stock: true },
      { price: 695, size: 'XL', sku: 'ШОРТ-109-XL-BEIGE', stock: true },
      { price: 695, size: 'XXL', sku: 'ШОРТ-109-XXL-BEIGE', stock: true },
    ],
  },
  {
    name: 'Корсет Shine',
    description: 'Корсет Shine на формованій поролоновій чашці з пуш-ап, виконаної з ситки. Чашка оздоблена стразами. Склад тканини: 81% поліамід, 19% еластан.',
    imageUrl: ["https://riksi.ua/content/images/8/800x1200l95mc0/korset-shine-96990292472196.webp", "https://riksi.ua/content/images/8/800x1200l95mc0/korset-shine-83924510550328.webp", "https://riksi.ua/content/images/8/800x1200l95mc0/korset-shine-52332271895677.webp", "https://riksi.ua/content/images/8/800x1200l95mc0/korset-shine-54719326292925.webp"],
    productUrl: 'korset-shine',
    price: 3590,
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 1}
    ],
    items: [
      { price: 3590, size: 'XXS', sku: 'КОРС-1-XXS', stock: false },
      { price: 3590, size: 'XS', sku: 'КОРС-1-XS', stock: true },
      { price: 3590, size: 'S', sku: 'КОРС-1-S', stock: true },
      { price: 3590, size: 'M', sku: 'КОРС-1-M', stock: true },
      { price: 3590, size: 'L', sku: 'КОРС-1-L', stock: true },
    ],
  },
  {
    name: 'Футболка Mickey Graphite',
    description: 'Однотонна футболка Mickey Graphite із махровими сердечками. Модель вільного краю з округлою горловиною.',
    imageUrl: ["https://riksi.ua/content/images/8/1050x1400l95mc0/futbolka-mickey-graphite-37740528178355.webp", "https://riksi.ua/content/images/8/1050x1400l95mc0/futbolka-mickey-graphite-69111300574540.webp", "https://riksi.ua/content/images/8/1050x1400l95mc0/futbolka-mickey-graphite-70570157605459.webp", "https://riksi.ua/content/images/8/1050x1400l95mc0/futbolka-mickey-graphite-95515501914204.webp"],
    productUrl: 'futbolka-mickey-graphite',
    price: 1195,
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 5}
    ],
    items: [
      { price: 1195, size: 'XXS', sku: 'ФУТБ-109-XXS-GRAPHITE', stock: true },
      { price: 1195, size: 'XS', sku: 'ФУТБ-109-XS-GRAPHITE', stock: true },
      { price: 1195, size: 'S', sku: 'ФУТБ-109-S-GRAPHITE', stock: true },
      { price: 1195, size: 'M', sku: 'ФУТБ-109-M-GRAPHITE', stock: true },
      { price: 1195, size: 'L', sku: 'ФУТБ-109-L-GRAPHITE', stock: true },
      { price: 1195, size: 'XL', sku: 'ФУТБ-109-XL-GRAPHITE', stock: true },
      { price: 1195, size: 'XXL', sku: 'ФУТБ-109-XXL-GRAPHITE', stock: true },
    ],
  },
  {
    name: 'Шорти Mickey Fuksia',
    description: 'Шорти Mickey Fuksia із махровими сердечками. Модель із високою посадкою з двома кишенями та шнурівкою.',
    imageUrl: ["https://riksi.ua/content/images/42/1200x1600l95mc0/shorty-mickey-fuksia-65450591341704.webp", "https://riksi.ua/content/images/42/1200x1599l95mc0/shorty-mickey-fuksia-77249826313713.webp", "https://riksi.ua/content/images/42/1200x1600l95mc0/shorty-mickey-fuksia-88680180034747.webp"],
    productUrl: 'shorty-mickey-fuksia',
    price: 895,
    currency: 'UAH',
    color: 'Рожевий',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 10}
    ],
    items: [
      { price: 895, size: 'XXS', sku: 'ШОРТ-108-XXS-FUKSIA', stock: true },
      { price: 895, size: 'XS', sku: 'ШОРТ-108-XS-FUKSIA', stock: true },
      { price: 895, size: 'S', sku: 'ШОРТ-108-S-FUKSIA', stock: true },
      { price: 895, size: 'M', sku: 'ШОРТ-108-M-FUKSIA', stock: true },
      { price: 895, size: 'L', sku: 'ШОРТ-108-L-FUKSIA', stock: true },
      { price: 895, size: 'XL', sku: 'ШОРТ-108-XL-FUKSIA', stock: true },
      { price: 895, size: 'XXL', sku: 'ШОРТ-108-XXL-FUKSIA', stock: true },
    ],
  },
  {
    name: 'Панчохи Weaving Strip Brown',
    description: 'Панчохи Weaving Brown виготовлені із якісного вʼязаного трикотажу на силіконовій резинці. Склад: 50% Віскоза, 28% Поліестер, 22% Нейлон.',
    imageUrl: ["https://riksi.ua/content/images/2/900x1200l95mc0/panchokhy-weaving-brown-27563744352185.webp", "https://riksi.ua/content/images/2/900x1200l95mc0/panchokhy-weaving-brown-73536269776367.webp", "https://riksi.ua/content/images/2/900x1200l95mc0/panchokhy-weaving-brown-32686313448185.webp"],
    productUrl: 'panchokhy-weaving-brown',
    price: 680,
    oldPrice: 790,
    sticker: [ProductStickers.PRICEPARTY],
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 4},
      {id: 10}
    ],
    subcategories: [
      {id: 14}
    ],
    items: [
      { price: 680, oldPrice: 790, size: 'XS', sku: 'ПАНЧ-128-XS-BROWN', stock: true },
      { price: 680, oldPrice: 790, size: 'S', sku: 'ПАНЧ-128-S-BROWN', stock: true },
      { price: 680, oldPrice: 790, size: 'M', sku: 'ПАНЧ-128-M-BROWN', stock: true },
      { price: 680, oldPrice: 790, size: 'L', sku: 'ПАНЧ-128-L-BROWN', stock: true },
      { price: 680, oldPrice: 790, size: 'XL', sku: 'ПАНЧ-128-XL-BROWN', stock: true },
      { price: 680, oldPrice: 790, size: 'XXL', sku: 'ПАНЧ-128-XXL-BROWN', stock: true },
    ],
  },
  {
    name: 'Штани Teddy Black',
    description: 'Штани Teddy Black виготовлені із мʼякого та приємного до тіла велсофту. Вільного крою із еластичною резинкою на поясі. Склад: 100% поліестер.',
    imageUrl: ["https://riksi.ua/content/images/8/900x1200l95mc0/shtany-teddy-black-38083846113763.webp", "https://riksi.ua/content/images/8/900x1200l95mc0/shtany-teddy-black-82078155612216.webp", "https://riksi.ua/content/images/8/900x1200l95mc0/shtany-teddy-black-67205472285707.webp"],
    productUrl: 'shtany-teddy-black',
    price: 1095,
    currency: 'UAH',
    color: 'Чорний',
    categories: [
      {id: 3}
    ],
    subcategories: [
      {id: 11}
    ],
    items: [
      { price: 1095, size: 'XXS', sku: 'ШТАН-88-XXS-BLACK', stock: true },
      { price: 1095, size: 'XS', sku: 'ШТАН-88-XS-BLACK', stock: true },
      { price: 1095, size: 'S', sku: 'ШТАН-88-S-BLACK', stock: true },
      { price: 1095, size: 'M', sku: 'ШТАН-88-M-BLACK', stock: true },
      { price: 1095, size: 'L', sku: 'ШТАН-88-L-BLACK', stock: true },
      { price: 1095, size: 'XL', sku: 'ШТАН-88-XL-BLACK', stock: true },
      { price: 1095, size: 'XXL', sku: 'ШТАН-88-XXL-BLACK', stock: true },
    ],
  },
  {
    name: 'Комбінезон Slim Milk',
    description: 'Комбінезон Slim Milk виконаний із трикотажу. Застібка на кнопках. Склад: 95% бавовна, 5% лайкра.',
    imageUrl: ["https://riksi.ua/content/images/2/579x869l95mc0/kombinezon-slim-milk-63894401349358.webp", "https://riksi.ua/content/images/2/579x869l95mc0/kombinezon-slim-milk-91805349193968.webp", "https://riksi.ua/content/images/2/579x869l95mc0/kombinezon-slim-milk-57204488016166.webp"],
    productUrl: 'kombinezon-slim-milk',
    price: 1095,
    oldPrice: 2190,
    sticker: [ProductStickers.PRICEPARTY],
    currency: 'UAH',
    color: 'Молочний',
    categories: [
      {id: 5},
      {id: 4}
    ],
    subcategories: [
      {id: 16}
    ],
    items: [
      { price: 1095, oldPrice: 2190, size: 'XS', sku: 'КОМБ-100-XS-MILK', stock: false },
      { price: 1095, oldPrice: 2190, size: 'S', sku: 'КОМБ-100-S-MILK', stock: false },
      { price: 1095, oldPrice: 2190, size: 'M', sku: 'КОМБ-100-M-MILK', stock: false },
      { price: 1095, oldPrice: 2190, size: 'L', sku: 'КОМБ-100-L-MILK', stock: false },
      { price: 1095, oldPrice: 2190, size: 'XL', sku: 'КОМБ-100-XL-MILK', stock: false },
      { price: 1095, oldPrice: 2190, size: 'XXL', sku: 'КОМБ-100-XXL-MILK', stock: false },
    ],
  },
];

const sliderImages = [
  {
    imageUrl: 'https://riksi.ua/content/images/7/1440x576e90nn0/46132421340665.webp',
    link: 'http://localhost:3000/catalog/body',
    altText: 'Колекція PRE-WINTERʼ25 від RIKSI',
    isMobile: false,
    isActive: true,
    position: 1,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/12/1440x576e90nn0/41800258047833.webp',
    link: 'http://localhost:3000/umovy-uchasti-v-rozihrashi',
    altText: 'RIKSI Shopping',
    isMobile: false,
    isActive: true,
    position: 2,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/34/1440x576e90nn0/28681354717475.webp',
    link: 'http://localhost:3000/catalog/domashniy-odiah',
    altText: 'Колекція NEW-YEARʼ25 від RIKSI',
    isMobile: false,
    isActive: true,
    position: 3,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/37/1440x576e90nn0/24647040547500.webp',
    altText: 'RIKSI',
    isMobile: true,
    isActive: false,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/24/640x800e80nn0/55459669888553.webp',
    altText: 'Riksi',
    position: 1,
    isMobile: true,
    isActive: true,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/46/640x800e80nn0/98991891637710.webp',
    altText: 'Riksi',
    position: 2,
    isMobile: true,
    isActive: true,
  }
];

const footerPages = [
  {
    title: 'Про нас',
    secondTitle: 'Підкресліть свою красу з українським брендом RIKSI',
    footerUrl: 'pro-nas',
    content: '<strong>RIKSI</strong> - український бренд спідньої жіночої білизни, боді, купальників та домашнього одягу, який заснований у 2020 році.  Маючи власне виробництво, ми створюємо унікальні колекції, які крокують у ногу з модними тенденціями та трендами. Для кожної моделі ми підбираємо тільки найкращі матеріали та найактуальніші кольори, щоб кожна дівчина або жінка виглядала яскраво і ловила на собі тисячі захоплених поглядів, а вдома тішилася своїми неповторними та грайливими образами, не забуваючи про комфорт у кожному русі.',
    isActive: true
  },
  {
    title: 'Гарантія',
    secondTitle: 'Гарантія на продукцію RIKSI',
    footerUrl: 'garantiya',
    content: 'Гарантія діє на всі види товарів 30 днів з моменту придбання. Відповідаємо за якість власних виробів і зобовʼязуємося робити обмін або повернення у разі виявлення виробничого браку.',
    isActive: true
  },
  {
    title: 'Обмін та повернення',
    secondTitle: 'Обмін та повернення продукції RIKSI',
    footerUrl: 'obmin-ta-povernennya',
    content: 'Товар можна обміняти чи повернути упродовж 14 днів з моменту отримання замовлення, якщо збережено товарний вигляд. <br> <br> Відповідно до Закону України "Про захист прав споживачів" спідня білизна відноситься до категорії товарів, що не підлягають обміну та поверненню, окрім випадків виробничого браку. Але, ми <strong> йдемо на назустріч нашим клієнтам </strong> і допускаємо повернення та обмін замовлення спідньої білизни. Обміняти її можна протягом 3 днів з моменту отримання. <br> <br> Ми ретельно перевіряємо одяг та білизну при обміні чи поверненні. У разі, якщо будуть помічені ознаки носіння, забруднення, пошкодження, відривання ярликів, то ми у праві відмовити Вам у Вашому проханні. <br> <br> Строки повернення коштів складають 1-3 робочих дні.',
    isActive: true
  },
  {
    title: 'Оплата і доставка',
    secondTitle: 'Оплата і доставка продукції RIKSI',
    footerUrl: 'oplata-i-dostavka',
    content: '<strong>Післяплата:</strong> <br> <br> Товар передається до поштового відділення після частокової оплати у розмірі 200 грн у якості доказу Вашої зацікавленості у покупці. Решту частину коштів сплачуєте у відділенні пошти. <br> <br> <strong>Передплата:</strong> <br> <br> <strong> Оплата замовлень по Україні: </strong> <br> <br> - Через WayForPay; <br> <br> - На карту ФОП;<br> <br> - За реквізитами IBAN; <br> <br> - Накладений платіж. <br> <br> <strong>Оплата для міжнародних замовлень:</strong> <br> <br> - Через WayForPay. <br> <br> <strong>Оплата частинами: </strong> <br> <br> - «Посилка в кредит» від Нової пошти. <br> <br> Укрпоштою по Україні та закордон за тарифами перевізників. <br> <br> При замовленні від 4000 грн доставка по Україні безкоштовно. <br> <br> <strong> Увага!</strong> Колір товару на фото може відрізнятися від реального, оскільки це повʼязано з особливостями кольорових відтінків дисплея Вашого телефону, налаштуваннями фотокамери або ж іншими факторами. <br> <br> Під час пакування товару ми ретельно перевіряємо річ на предмет браку та на якість самої упаковки. Усі товари передаються до перевізника упаковані належним чином. Ми не несемо відповідальності за збереження пакування при транспортуванні. У разі пошкодження пакування, будь ласка, звертайтеся до перевізника, оскільки компанія перевізник несе відповідальність за належне транспортування посилок.',
    isActive: true
  },
  {
    title: 'Угода користувача',
    secondTitle: '',
    footerUrl: 'privacypolicy',
    content: "",
    isActive: true
  },
  {
    title: 'Публічний договір',
    secondTitle: '',
    footerUrl: 'publichnyi-dohovir',
    content: '',
    isActive: true
  },
  {
    title: 'Умови участі у розіграші',
    secondTitle: '',
    footerUrl: 'umovy-uchasti-v-rozihrashi',
    content: '',
    isActive: true
  }
]

const bannerImages = [
  {
    imageUrl: 'https://riksi.ua/content/images/33/720x432e90nn0/24857368472573.webp',
    link: 'catalog/domashniy-odiah',
    isActive: true,
    isMobile: false,
    altText: 'Pajamas Banner',
    position: 1,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/34/720x432e90nn0/63711780951309.webp',
    link: 'catalog/bilyzna',
    isActive: true,
    isMobile: false,
    altText: 'Body Suit Banner',
    position: 2,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/33/1280x1280e80nn0/12701472551900.webp',
    link: 'catalog/bilyzna',
    isActive: true,
    isMobile: true,
    altText: 'RIKSI Lingerie Banner',
    position: 1,
  },
  {
    imageUrl: 'https://riksi.ua/content/images/19/1280x1280e80nn0/53409880640409.webp',
    link: 'catalog/domashniy-odiah',
    isActive: true,
    isMobile: true,
    altText: 'RIKSI Home Clothes Banner',
    position: 2,
  },
];

const bottomBannerImage = [
  {
    imageUrl: 'https://riksi.ua/content/images/40/1440x216e90nn0/51054835940617.webp',
    altText: 'Price Party Bottom Banner',
    link: 'http://localhost:3000/catalog/price-party',
    position: 1
  }
];

const complects = [
  [
    { productUrl: products[14].productUrl },
    { productUrl: products[15].productUrl },
    { productUrl: products[16].productUrl },
  ],
  [
    { productUrl: products[17].productUrl },
    { productUrl: products[18].productUrl },
    { productUrl: products[19].productUrl },
  ]
]

async function seed() {
  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
        categoryUrl: category.categoryUrl,  // додаємо categoryUrl
        description: category.description,
        subcategories: {
          create: category.subcategories.map(subcategory => ({
            name: subcategory.name,
            subcategoryUrl: subcategory.subcategoryUrl,  // додаємо subcategoryUrl
            description: subcategory.description,
          })),
        },
      },
    });

  }

  for (const sliderImage of sliderImages) {
    const createdSliderImage = await prisma.sliderImage.create({
      data: {
        imageUrl: sliderImage.imageUrl,
        altText: sliderImage.altText,
        link: sliderImage.link,
        position: sliderImage.position,
        isMobile: sliderImage.isMobile,
        isActive: sliderImage.isActive
      },
    });

    console.log(`Created slider image: ${createdSliderImage.altText}`);
  }

  for (const bannerImage of bannerImages) {
    const createdBannerImage = await prisma.bannerImage.create({
      data: {
        imageUrl: bannerImage.imageUrl,
        altText: bannerImage.altText,
        link: bannerImage.link,
        isActive: bannerImage.isActive,
        isMobile: bannerImage.isMobile,
        position: bannerImage.position,
      },
    });

    console.log(`Created slider image: ${createdBannerImage.altText}`);
  }

  for(const BottomBannerImage of bottomBannerImage) {
    const createdBottomBannerImage = await prisma.bottomBannerImage.create({
      data: {
        imageUrl: BottomBannerImage.imageUrl,
        altText: BottomBannerImage.altText,
        position: BottomBannerImage.position,
        link: BottomBannerImage.link
      }
    })
    console.log(`Created bottom banner image: ${createdBottomBannerImage.altText}`)
  }

  for(const footerPage of footerPages) {
    const createdFooterPage = await prisma.footerPage.create({
      data: {
        title: footerPage.title,
        secondTitle: footerPage.secondTitle,
        footerUrl: footerPage.footerUrl,
        content: footerPage.content,
        isActive: footerPage.isActive
      }
    })
    console.log(`Created footer page: ${createdFooterPage.title}`)
  }

  for (const product of products) {
    const isInStock = product.items.some((item: any) => item.stock === true);
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        productUrl: product.productUrl,
        stock: isInStock,
        price: product.price,
        sticker: product.sticker,
        oldPrice: product.oldPrice,
        popularity: product.popularity,
        currency: product.currency,
        color: product.color,
        categories: {
          create: product.categories.map((category: any) => ({
            category: {
              connect: { id: category.id },
            },
          })),
        },
        subcategories: {
          create: product.subcategories?.map((subcategory: any) => ({
            subcategory: {
              connect: { id: subcategory.id },
            },
          })),
        },
        items: {
          create: product.items.map((item: any) => ({
            price: item.price,
            size: item.size,
            oldPrice: item.oldPrice,
            sku: item.sku,
            stock: item.stock,
          })),
        },
      },
    });

    console.log(`Created product: ${createdProduct.name}`);
  }

  for(const complect of complects) {
    const createdComplect = await prisma.productComplect.create({
      data: {
        products: {
          connect: complect.map(product => ({ productUrl: product.productUrl })),
        },
      },
    });
  }
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Subcategory" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "SliderImage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "BannerImage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "BottomBannerImage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "FooterPage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductComplect" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await seed();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();