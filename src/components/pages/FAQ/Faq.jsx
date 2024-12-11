import React, { useState } from 'react';
import classes from './Faq.module.css';
import HeaderNavigation from '../../UI/HeaderNavigation/HeaderNavigation';
import Footer from '../../Footer/Footer';
import FAQBlock from './FAQBlock/FAQBlock';
import questionIcon from '../../UI/icons/question.svg';
import shippingIcon from '../../UI/icons/shipping.svg';
import contactsIcon from '../../UI/icons/contact.svg';

const Faq = () => {
    const [detailsOpen, setDetailsOpen] = useState({
        shipping: false,
        contacts: false,
        faq: false
    });
    
    const toggleDetails = (section) => {
        setDetailsOpen({
            shipping: section === 'shipping' ? !detailsOpen.shipping : false,
            contacts: section === 'contacts' ? !detailsOpen.contacts : false,
            faq: section === 'faq' ? !detailsOpen.faq : false
        });
    };

    const CONTACTS_LINK = "https://t.me/NiceDunksOrder";
    const INSTAGRAM_LINK = "https://www.instagram.com/_goba_/";
    const VK_LINK = "https://vk.com/nicedunks";
    const AVITO_LINK = "https://www.avito.ru/user/c560662529d1530f9fab8dd500a9934e/profile?src=sharing";
    const INSTAGRAM_SELL_LINK = "https://instagram.com/donalddunks/";
    const MANAGER_LINK = "https://t.me/NiceDunksManager";

    return (
        <div>
            <HeaderNavigation />
            <div className={classes.faq__wrapper}>
                <FAQBlock
                    icon={questionIcon}
                    title="Частые вопросы по заказам"
                    description="Предзаказы и их сроки, гарантии, отсутствие товара на сайте и другие вопросы."
                    onClick={() => toggleDetails('faq')}
                />
                <li className={`${classes.details} ${detailsOpen.faq ? classes.visible : ''}`}>
                <br /><p>Все ваши товары оригинал?</p>Да, у нас строго оригинальная продукция. Каждый товар проходит индивидуальную проверку.<br /><br />
                    <p>Какие у вас гарантии?</p>Более тысячи положительных отзывов с 2017 года в профиле <a href="https://vk.com/wall170701681_4583">вк</a> и  <a href="https://www.avito.ru/user/c560662529d1530f9fab8dd500a9934e/profile?src=sharing">авито</a>.<br /><br />
                    <p>Как быстро приходит товар по предзаказу?</p>Сроки доставки товаров по предзаказу составляют 14-21 день. Возможна экспресс доставка.<br /><br />
                    <p>Что делать, если желаемого товара нет на сайте?</p>Если интересующей позиции нет на сайте, она доступна по предзаказу. Обращайтесь по предзаказу к нашему <a href={MANAGER_LINK}>менеджеру</a>.<br /><br />
                </li>
                <FAQBlock
                    icon={shippingIcon}
                    title="Доставка и оплата"
                    onClick={() => toggleDetails('shipping')}
                    description="Варианты и сроки доставки, сроки отправки, способы оплаты, доставка в другие страны и другие вопросы."
                />
                <li className={`${classes.details} ${detailsOpen.shipping ? classes.visible : ''}`}>
                    <br />Самовывоз в городе Москва в районе метро Ботанический Сад <br />
                    <br />Курьерская доставка по Москве осуществляется сервисами:
                    <br />Яндекс Go и Достависта <br />
                    <br />Доставка по России и СНГ осуществляется почтовыми службами: 
                    <br />Сдэк, Почта РФ и Boxberry  <br />
                    <br />Стоимость доставки рассчитывается отдельно <br />
                    <br />Доставка по миру осуществляется курьерской службой EMS Почта России<br />
                    <br />Оплата возможна переводом / наличными при самовывозе / авито доставкой<br /><br />
                </li>
                <FAQBlock
                    icon={contactsIcon}
                    title="Наши контакты"
                    onClick={() => toggleDetails('contacts')}
                    description="Ссылки на наши социальные сети, перечень товаров под заказ и многое другое."
                />
                <li className={`${classes.details} ${detailsOpen.contacts ? classes.visible : ''}`}>
                    <br/><a href={CONTACTS_LINK}>ПОЗИЦИИ ПОД ЗАКАЗ</a><br />
                    <br/><a href={INSTAGRAM_LINK}>личный аккаунт в инстаграме</a><br />
                    <br/><a href={VK_LINK}>основная страница в вк</a><br />
                    <br/><a href={AVITO_LINK}>мой профиль на авито</a><br />
                    <br/><a href={INSTAGRAM_SELL_LINK}>аккаунт для продаж в инстаграмме</a><br />
                    <br/><a href={MANAGER_LINK}>менеджер по предзаказам</a><br /><br /><br />
                </li>
            </div>
            <Footer />
        </div>
    );
};

export default Faq;
