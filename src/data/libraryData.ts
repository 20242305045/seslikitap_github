import { LibraryItem, AppNotification } from '../types';

export const INITIAL_LIBRARY: LibraryItem[] = [
  // ================= 1. FELSEFE & DÜŞÜNCE (4 Kitap) =================
  {
    id: 'book-simyaci',
    type: 'audiobook',
    title: 'Simyacı',
    authorOrHost: 'Paulo Coelho',
    narrator: 'Tilbe Saran',
    category: 'Felsefe & Düşünce',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-600/40 via-orange-950 to-neutral-950',
    rating: 4.9,
    totalDurationFormatted: '4 sa 15 dk',
    totalDurationSeconds: 15300,
    description: 'Endülüslü çoban Santiago\'nun İspanya çöllerinden Mısır piramitlerine uzanan gizemli ve dönüştürücü içsel yolculuğu. Evrenin işaretlerini okumak ve Kişisel Menkıbe\'yi keşfetmek üzerine zamansız bir başyapıt.',
    chapters: [
      {
        id: 'ch-s-1',
        number: 1,
        title: 'Bölüm 1: Endülüs Ovaları ve Rüyadaki Piramitler',
        durationSeconds: 320,
        formattedDuration: '05:20',
        summary: 'Santiago koyunlarıyla terk edilmiş kilisede uyanır ve gördüğü tekrarlayan rüyanın peşine düşmeye karar verir.',
        script: 'Santiago, sürüsüyle birlikte terk edilmiş eski kiliseye vardığında hava kararmak üzereydi. Çatısı çoktan çökmüş kilisenin kutsal emanetler odasının yerinde devasa bir firavuninciri ağacı yükselmişti. Uykuya daldığında yine aynı rüyayı gördü. Bir çocuk elinden tutuyor ve onu Mısır piramitlerine götürüyordu. "Eğer buraya gelirsen, gizli bir hazine bulacaksın" diyordu çocuk. Santiago rüyanın işaret olduğunu sezdi.',
      },
      {
        id: 'ch-s-2',
        number: 2,
        title: 'Bölüm 2: Salem Kralı Melkisedek ve Evrenin Dili',
        durationSeconds: 410,
        formattedDuration: '06:50',
        summary: 'Tarifa meydanında yaşlı adamla karşılaşma; Kişisel Menkıbe ve Urim ile Tummim taşlarının sırrı.',
        script: 'Yaşlı adam tahta değneğiyle kuma Santiago\'nun adını, anne ve babasının adını ve kimseye söylemediği sırlarını yazdı. "Ben Salem Kralıyım" dedi. "İnsanlar hayatlarının bir anında kendi kaderlerine egemen olmaktan vazgeçerler. Dünyanın en büyük yalanı budur. Bir şeyi gerçekten istediğin zaman, bütün evren o arzunun gerçekleşmesi için işbirliği yapar."',
      },
      {
        id: 'ch-s-3',
        number: 3,
        title: 'Bölüm 3: Sahra Çölü ve Simyacının Öğretisi',
        durationSeconds: 480,
        formattedDuration: '08:00',
        summary: 'Vahada Fatıma ile tanışma, çöl fırtınası ve kalbin sesini dinleme sanatı.',
        script: 'Çöl rüzgarı esiyordu. Simyacı atının üstünde heybetle durdu: "Yüreğine dikkat et delikanlı. Çünkü hazinen neredeyse yüreğin de orada olacaktır. Yüreğin sana korktuğunu söyleyecektir. Ona ıstırap çekme korkusunun, ıstırabın kendisinden daha kötü olduğunu söyle. Arayışa çıkan hiçbir yürek asla acı çekmez."',
      }
    ]
  },
  {
    id: 'book-kendime-dusunceler',
    type: 'audiobook',
    title: 'Kendime Düşünceler',
    authorOrHost: 'Marcus Aurelius',
    narrator: 'Haluk Bilginer',
    category: 'Felsefe & Düşünce',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-700/40 via-yellow-950 to-neutral-950',
    rating: 4.92,
    totalDurationFormatted: '3 sa 45 dk',
    totalDurationSeconds: 13500,
    description: 'Roma İmparatoru ve Stoacı filozof Marcus Aurelius\'un cephede kendine yazdığı sarsıcı günlükler. Duyguları yönetmek, öfkeyi dinginliğe dönüştürmek ve iç kaleyi inşa etmek.',
    chapters: [
      {
        id: 'ch-kd-1',
        number: 1,
        title: 'Bölüm 1: Sabah Uyanırken Zihni Hazırlamak',
        durationSeconds: 310,
        formattedDuration: '05:10',
        summary: 'Güne başlarken nankör ve öfkeli insanlarla karşılaşacağını bilmek ve Stoacı kalkanı kuşanmak.',
        script: 'Sabahleyin uyandığında kendine şöyle de: Bugün nankör, küstah, hilekar, kıskanç ve bencil insanlarla karşılaşacağım. Onların bu kusurları iyiyi ve kötüyü birbirinden ayırt edemeyişlerinden kaynaklanır. Oysa ben iyinin doğasının güzel, kötünün doğasının ise çirkin olduğunu gördüm. Hiçbiri bana zarar veremez.',
      },
      {
        id: 'ch-kd-2',
        number: 2,
        title: 'Bölüm 2: İç Kale ve Değişmez Huzur',
        durationSeconds: 360,
        formattedDuration: '06:00',
        summary: 'İnsanın kendi ruhundan daha sakin ve huzurlu çekilebileceği hiçbir kırsal sığınak yoktur.',
        script: 'İnsanlar kırlara, deniz kenarlarına, dağlara çekilmek isterler. Oysa insanın kendi ruhundan daha sakin, daha gürültüsüz sığınabileceği hiçbir yer yoktur. Ruhunun içine bak ve orada Stoacı dinginliği bul. Olaylar ruhuna dokunamaz; dışarıda hareketsiz kalırlar. Bütün sıkıntı kendi iç yargılarından doğar.',
      }
    ]
  },
  {
    id: 'book-zerdust',
    type: 'audiobook',
    title: 'Böyle Buyurdu Zerdüşt',
    authorOrHost: 'Friedrich Nietzsche',
    narrator: 'Köksal Engür',
    category: 'Felsefe & Düşünce',
    coverImage: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-orange-800/40 via-red-950 to-neutral-950',
    rating: 4.88,
    totalDurationFormatted: '6 sa 10 dk',
    totalDurationSeconds: 22200,
    description: 'Dağda on yıl yalnız yaşayan Zerdüşt\'ün insanlara Üstinsan, bengi dönüş ve sürü ahlakından kurtuluş manifestosu.',
    chapters: [
      {
        id: 'ch-zer-1',
        number: 1,
        title: 'Bölüm 1: Zerdüşt\'ün Dağdan İnişi ve Üç Dönüşüm',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Ruhun deveye, devenin aslana ve aslanın masum bir çocuğa dönüşüm serüveni.',
        script: 'Zerdüşt otuz yaşındayken yurdunu ve yurdunun gölünü bıraktı, dağlara çıktı. Orada ruhunun ve yalnızlığının tadını çıkardı. On yıl boyunca bıkmadı bundan. Fakat sonunda kalbi değişti. Bir sabah şafakla kalktı, güneşin karşısına geçti ve şöyle dedi: "Ey ulu yıldız, aydınlattıkların olmasaydı ne olurdu senin mutluluğun?" İnsanların arasına inme vakti gelmişti.',
      }
    ]
  },
  {
    id: 'book-sokrates',
    type: 'audiobook',
    title: 'Sokrates\'in Savunması',
    authorOrHost: 'Platon',
    narrator: 'Cüneyt Türel',
    category: 'Felsefe & Düşünce',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-yellow-800/40 via-amber-950 to-neutral-950',
    rating: 4.89,
    totalDurationFormatted: '2 sa 15 dk',
    totalDurationSeconds: 8100,
    description: 'Atina mahkemesinde ölüme karşı boyun eğmeyen Sokrates\'in felsefe ve vicdan manifestosu: Sorgulanmamış bir hayat yaşanmaya değmez.',
    chapters: [
      {
        id: 'ch-sok-1',
        number: 1,
        title: 'Bölüm 1: Bilgeliğin Peşinde ve Delfi Kahini',
        durationSeconds: 330,
        formattedDuration: '05:30',
        summary: 'Tek bir şey biliyorum, o da hiçbir şey bilmediğimdir ilkesinin mahkeme önünde ilanı.',
        script: 'Atinalılar, beni suçlayanların üzerinizde nasıl bir etki bıraktığını bilemem; ama öyle inandırıcı konuştular ki neredeyse ben bile kim olduğumu unutuyordum. Yine de tek bir doğru söz söylemediler. Ben süslü laflar etmesini bilmem. Tek bildiğim bir şey var, o da hiçbir şey bilmediğimdir.',
      }
    ]
  },

  // ================= 2. KLASİK EDEBİYAT (4 Kitap) =================
  {
    id: 'book-donusum',
    type: 'audiobook',
    title: 'Dönüşüm',
    authorOrHost: 'Franz Kafka',
    narrator: 'Yetkin Dikinciler',
    category: 'Klasik Edebiyat',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-stone-700/40 via-neutral-900 to-neutral-950',
    rating: 4.85,
    totalDurationFormatted: '2 sa 40 dk',
    totalDurationSeconds: 9600,
    description: 'Gregor Samsa\'nın bir sabah kendini devasa bir böceğe dönüşmüş olarak bulmasıyla başlayan, modern insanın yabancılaşmasını ve aile bağlarının kırılganlığını anlatan sarsıcı roman.',
    chapters: [
      {
        id: 'ch-d-1',
        number: 1,
        title: 'Bölüm 1: Gregor Samsa\'nın Uyanışı',
        durationSeconds: 310,
        formattedDuration: '05:10',
        summary: 'Huzursuz düşlerin ardından gelen başkalaşım ve saatin tiktakları.',
        script: 'Gregor Samsa bir sabah huzursuz düşlerden uyandığında, kendini yatağında devasa bir böceğe dönüşmüş olarak buldu. Zırh gibi sertleşmiş sırtının üstünde yatıyordu ve başını biraz kaldırdığında yay biçiminde kahverengi, sert bölmelerle parsellenmiş kubbe gibi karnını gördü. "Bana ne oldu böyle?" diye düşündü. Bu bir rüya değildi.',
      },
      {
        id: 'ch-d-2',
        number: 2,
        title: 'Bölüm 2: Kilitli Kapılar ve Ailenin Dehşeti',
        durationSeconds: 360,
        formattedDuration: '06:00',
        summary: 'Müdürün gelişi, konuşamayan Gregor ve kaçış çabası.',
        script: 'Odasının kapısını kilitlemek onun ticaret hayatında edindiği bir alışkanlıktı. Şimdi kapının ardında annesinin endişeli, babasının öfkeli sesini duyuyordu. Gregor cevap vermek istediğinde boğazından insani sesler yerine acayip bir hırıltı yükseldi.',
      }
    ]
  },
  {
    id: 'book-suc-ve-ceza',
    type: 'audiobook',
    title: 'Suç ve Ceza',
    authorOrHost: 'Fyodor Dostoyevski',
    narrator: 'Mazlum Kiper',
    category: 'Klasik Edebiyat',
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-red-900/40 via-stone-950 to-neutral-950',
    rating: 4.96,
    totalDurationFormatted: '18 sa 30 dk',
    totalDurationSeconds: 66600,
    description: 'Petersburg sokaklarında Raskolnikov\'un vicdan, kibir ve ahlak ikilemleri. Kendini Napolyon gibi sıradışı bir insan sanarak işlediği cinayetin ruhsal bedeli.',
    chapters: [
      {
        id: 'ch-sc-1',
        number: 1,
        title: 'Bölüm 1: Petersburg Sıcaktan Kavrulurken',
        durationSeconds: 360,
        formattedDuration: '06:00',
        summary: 'Raskolnikov çatı katındaki sefil odasından çıkar ve tefeci kadının kapısını çalar.',
        script: 'Temmuz başlarında, bunaltıcı sıcak bir akşamüstü, bir genç adam S. sokağındaki pansiyoner kaldığı küçücük tavan arasından sokağa çıktı. Ağır adımlarla K. köprüsüne doğru yöneldi. Borçlu olduğu ev sahibesiyle karşılaşmaktan korkuyordu. Kafasında korkunç bir düşünce filizleniyordu: "İnsan büyük bir amaç uğruna vicdanını çiğneyebilir mi?"',
      }
    ]
  },
  {
    id: 'book-yabanci',
    type: 'audiobook',
    title: 'Yabancı',
    authorOrHost: 'Albert Camus',
    narrator: 'Genco Erkal',
    category: 'Klasik Edebiyat',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-900/40 via-stone-900 to-neutral-950',
    rating: 4.87,
    totalDurationFormatted: '3 sa 10 dk',
    totalDurationSeconds: 11400,
    description: 'Cezayir sahilinde kör edici güneşin altında gerçekleşen anlamsız cinayet. Meursault\'nun toplumsal ikiyüzlülüğe ve absürd evrene karşı kayıtsız duruşu.',
    chapters: [
      {
        id: 'ch-yab-1',
        number: 1,
        title: 'Bölüm 1: Bugün Annem Öldü',
        durationSeconds: 300,
        formattedDuration: '05:00',
        summary: 'Cenaze töreni, Marengo huzurevi ve kavurucu Cezayir sıcağı.',
        script: 'Bugün annem öldü. Belki de dün, bilmiyorum. Huzurevinden bir telgraf aldım: "Anneniz vefat etti. Cenaze yarın. Derin taziyelerimizle." Bundan pek bir şey anlaşılmıyor. Belki de dündü. İki günlük izin aldım patronumdan. Bir an bana ters ters baktı, ben de "Kabahat bende değil" dedim.',
      }
    ]
  },
  {
    id: 'book-1984',
    type: 'audiobook',
    title: '1984',
    authorOrHost: 'George Orwell',
    narrator: 'Sezai Aydın',
    category: 'Klasik Edebiyat',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-slate-800/40 via-neutral-950 to-neutral-950',
    rating: 4.94,
    totalDurationFormatted: '9 sa 45 dk',
    totalDurationSeconds: 35100,
    description: 'Büyük Birader\'in her an izlediği Okyanusya\'da Winston Smith\'in özgür düşünce ve aşk arayışı. Çiftdüşün ve tele-ekranların gölgesinde distopik başyapıt.',
    chapters: [
      {
        id: 'ch-1984-1',
        number: 1,
        title: 'Bölüm 1: Saatler On Üçü Vuruyordu',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Soğuk bir nisan günü, tele-ekranın gözetimi altında yasak bir günlük başlatmak.',
        script: 'Hava pırıl pırıl, soğuk bir nisan günüydü; saatler on üçü vuruyordu. Winston Smith, yakıcı rüzgardan korunmak için çenesini göğsüne gömmüş, Zafer Konutları\'nın cam kapılarından içeri çabucak süzüldü. Giriş holü kaynamış lahana ve eski bez paspas kokuyordu. Duvarda devasa afiş asılıydı: BÜYÜK BİRADER SENİ İZLİYOR.',
      }
    ]
  },

  // ================= 3. PSİKOLOJİ & KİŞİSEL GELİŞİM (4 Kitap) =================
  {
    id: 'book-atomik-aliskanliklar',
    type: 'audiobook',
    title: 'Atomik Alışkanlıklar',
    authorOrHost: 'James Clear',
    narrator: 'Murat Eken',
    category: 'Psikoloji & Kişisel Gelişim',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-700/40 via-teal-950 to-neutral-950',
    rating: 4.95,
    totalDurationFormatted: '5 sa 30 dk',
    totalDurationSeconds: 19800,
    description: 'Küçük değişimlerin olağanüstü sonuçları. Hedeflere değil, sistemlere odaklanarak kimlik temelli sürdürülebilir alışkanlıklar inşa etme rehberi.',
    chapters: [
      {
        id: 'ch-at-1',
        number: 1,
        title: 'Bölüm 1: %1\'lik İyileşmenin Şaşırtıcı Gücü',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Bileşik faiz prensibinin kişisel gelişime uygulanması ve hayal kırıklığı platosunu aşmak.',
        script: 'Her gün sadece yüzde bir oranında daha iyi olursanız, bir yılın sonunda tam 37 kat daha iyi hale gelirsiniz. Küçük değişimler ilk başta fark edilmez. Buz küpü eksi dört dereceden eksi bir dereceye çıktığında erimez; ancak sıfır dereceyi geçtiğinde aniden sıvılaşır. Alışkanlıkların gücü birikimli gecikmede saklıdır.',
      },
      {
        id: 'ch-at-2',
        number: 2,
        title: 'Bölüm 2: Kimliğe Dayalı Alışkanlıklar İnşa Etmek',
        durationSeconds: 390,
        formattedDuration: '06:30',
        summary: 'Sonuç odaklı değil, olmak istediğiniz kişiye dair oyları toplamak.',
        script: 'En derin davranış değişimi kimlik değişimidir. "Sigarayı bırakmaya çalışıyorum" demek ile "Ben sigara içmeyen biriyim" demek arasındaki fark muazzamdır. Yaptığınız her eylem, gelecekte olmak istediğiniz kişiliğe verilmiş bir oydur.',
      }
    ]
  },
  {
    id: 'book-anlam-arayisi',
    type: 'audiobook',
    title: 'İnsanın Anlam Arayışı',
    authorOrHost: 'Viktor E. Frankl',
    narrator: 'Ali Düşenkalkar',
    category: 'Psikoloji & Kişisel Gelişim',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-blue-900/40 via-indigo-950 to-neutral-950',
    rating: 4.97,
    totalDurationFormatted: '4 sa 00 dk',
    totalDurationSeconds: 14400,
    description: 'Auschwitz toplama kampında hayatta kalan psikiyatr Frankl\'ın logoterapi felsefesi: Yaşamak için bir nedeni olan insan, her türlü nasıla katlanabilir.',
    chapters: [
      {
        id: 'ch-anl-1',
        number: 1,
        title: 'Bölüm 1: Kampta İlk Günler ve İllüzyonun Yıkılışı',
        durationSeconds: 330,
        formattedDuration: '05:30',
        summary: 'Tren rayları, seçim rampası ve insanın ruhsal direncini keşfetmesi.',
        script: 'Auschwitz\'e yaklaşırken trenin küçük parmaklıklı pencerelerinden baktık. Ufukta alevler ve bacalar görünüyordu. O anda bütün mülkiyetimizi kaybettik. Geriye sadece çırılçıplak varlığımız kalmıştı. Nietzsche\'nin sözünü hatırladım: "Yaşamak için bir nedeni olan insan, neredeyse her türlü nasıla dayanabilir."',
      }
    ]
  },
  {
    id: 'book-beden-kayit-tutar',
    type: 'audiobook',
    title: 'Beden Kayıt Tutar',
    authorOrHost: 'Bessel van der Kolk',
    narrator: 'Ceyda Düvenci',
    category: 'Psikoloji & Kişisel Gelişim',
    coverImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-teal-800/40 via-slate-950 to-neutral-950',
    rating: 4.91,
    totalDurationFormatted: '12 sa 15 dk',
    totalDurationSeconds: 44100,
    description: 'Travmanın beyin, zihin ve beden üzerindeki biyolojik izleri. Sinir sistemini onarma, yoga, nefes ve nörogeribildirim ile iyileşme yolları.',
    chapters: [
      {
        id: 'ch-bkt-1',
        number: 1,
        title: 'Bölüm 1: Travma Nörolojisi ve Amigdalanın Alarmı',
        durationSeconds: 350,
        formattedDuration: '05:50',
        summary: 'Tehlike geçtiği halde bedenin neden hala savaş-kaç durumunda takılı kaldığının nörobiyolojisi.',
        script: 'Travma sadece geçmişte yaşanmış bir olay değildir; kişinin bedeninde ve beyninde canlı kalan bir fiziksel tepkidir. Beynin duman dedektörü olan amigdala sürekli tehlike sinyali verdiğinde, mantıklı düşünen sol frontal korteks devre dışı kalır. İyileşme, bedene güvende olduğunu yeniden öğretmekle başlar.',
      }
    ]
  },
  {
    id: 'book-dusun-ve-zengin-ol',
    type: 'audiobook',
    title: 'Düşün ve Zengin Ol',
    authorOrHost: 'Napoleon Hill',
    narrator: 'Aydoğan Temel',
    category: 'Psikoloji & Kişisel Gelişim',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-800/40 via-emerald-950 to-neutral-950',
    rating: 4.82,
    totalDurationFormatted: '7 sa 20 dk',
    totalDurationSeconds: 26400,
    description: 'Andrew Carnegie ve 500 başarılı liderin incelenmesiyle ortaya çıkan 13 zihinsel başarı ilkesi: Kesin amaç ve yakıcı arzu.',
    chapters: [
      {
        id: 'ch-dzo-1',
        number: 1,
        title: 'Bölüm 1: Düşünceler Nesnelere Dönüşür',
        durationSeconds: 320,
        formattedDuration: '05:20',
        summary: 'Zihinde netleşen vizyonun fiziksel karşılığını yaratma mekanizması.',
        script: 'Düşünceler gerçekten de güçlü şeylerdir; hele kesin bir hedef, sebat ve yakıcı bir arzuyla birleştiklerinde zenginliğe ya da diğer maddi varlıklara dönüşürler. Edwin Barnes, Thomas Edison ile ortak çalışmayı kafasına koyduğunda cebinde bir kuruş bile yoktu ama kararlılığı çelik gibiydi.',
      }
    ]
  },

  // ================= 4. BİLİM KURGU & GELECEK (4 Kitap) =================
  {
    id: 'book-dune',
    type: 'audiobook',
    title: 'Dune: Çöl Gezegeni',
    authorOrHost: 'Frank Herbert',
    narrator: 'Levent Üzümcü',
    category: 'Bilim Kurgu & Gelecek',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-600/40 via-red-950 to-neutral-950',
    rating: 4.98,
    totalDurationFormatted: '21 sa 00 dk',
    totalDurationSeconds: 75600,
    description: 'Arrakis çölünde baharat savaşları, dev kumsolucanları ve Paul Atreides\'in mesiyanik yükselişi. Politika, ekoloji ve insan evriminin epik anıtı.',
    chapters: [
      {
        id: 'ch-dune-1',
        number: 1,
        title: 'Bölüm 1: Caladan\'dan Ayrılış ve Gom Jabbar Sınavı',
        durationSeconds: 380,
        formattedDuration: '06:20',
        summary: 'Bene Gesserit Rahibe Anası ve Paul\'ün insanlık testindeki acı kutusu.',
        script: 'Caladan gecesi serindi. Yaşlı kadın siyah cübbesi içinde kapıda belirdiğinde Paul annesinin gözlerindeki gerilimi hissetti. "Kutunun içine elini koy delikanlı," dedi Rahibe Ana. "Boynuna zehirli gom jabbar iğnesini dayıyorum. Eğer elini kutudan çekersen ölürsün. Korku akıl katilidir; korku toptan yok oluşu getiren küçük ölümdür."',
      }
    ]
  },
  {
    id: 'book-cesur-yeni-dunya',
    type: 'audiobook',
    title: 'Cesur Yeni Dünya',
    authorOrHost: 'Aldous Huxley',
    narrator: 'Tarkan Koç',
    category: 'Bilim Kurgu & Gelecek',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-cyan-800/40 via-purple-950 to-neutral-950',
    rating: 4.88,
    totalDurationFormatted: '8 sa 15 dk',
    totalDurationSeconds: 29700,
    description: 'Tüplerde üretilen insanlar, acıyı bastıran soma hapları ve hissizleşmiş tüketim toplumu. Teknolojik konforun insan ruhunu nasıl tutsak ettiğinin vizyoner tablosu.',
    chapters: [
      {
        id: 'ch-cyd-1',
        number: 1,
        title: 'Bölüm 1: Londra Kuluçka ve Şartlandırma Merkezi',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Topluluk, Özdeşlik, İstikrar sloganı ve Bokanovsky süreci.',
        script: 'Gri, alçak bir bina; yalnızca otuz dört katlıydı. Giriş kapısının üstünde şu yazı göze çarpıyordu: LONDRA MERKEZİ KULUÇKA VE ŞARTLANDIRMA MERKEZİ. Ve bir kalkanda topluluğun parolası parıldıyordu: TOPLULUK, ÖZDEŞLİK, İSTİKRAR. Burada insan doğurulmaz; laboratuvar tüplerinde sınıfına göre tasarlanırdı.',
      }
    ]
  },
  {
    id: 'book-vakif',
    type: 'audiobook',
    title: 'Vakıf',
    authorOrHost: 'Isaac Asimov',
    narrator: 'Sungun Babacan',
    category: 'Bilim Kurgu & Gelecek',
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-indigo-800/40 via-slate-950 to-neutral-950',
    rating: 4.93,
    totalDurationFormatted: '9 sa 30 dk',
    totalDurationSeconds: 34200,
    description: 'Hari Seldon\'un psikotarih bilimiyle Galaktik İmparatorluğun kaçınılmaz çöküşünü öngörüp 30.000 yıllık karanlığı 1000 yıla indirmek için kurduğu Vakıf.',
    chapters: [
      {
        id: 'ch-vak-1',
        number: 1,
        title: 'Bölüm 1: Psikotarihçi Hari Seldon',
        durationSeconds: 350,
        formattedDuration: '05:50',
        summary: 'Trantor gezegeninde mahkeme salonu ve galaksinin kaçınılmaz çöküş hesabı.',
        script: 'Hari Seldon, Trantor mahkemesinde yargıçlara baktı: "İmparatorluk yıkılacak efendiler. Bunu durduramazsınız. Psikotarih denklemleri yanılmaz. Trantor üç yüz yıl içinde harabeye dönecek ve insanlık otuz bin yıllık bir barbarlık çağına girecek. Benim amacım bu karanlığı bin yıla düşürmektir."',
      }
    ]
  },
  {
    id: 'book-galaksi-rehberi',
    type: 'audiobook',
    title: 'Otostopçunun Galaksi Rehberi',
    authorOrHost: 'Douglas Adams',
    narrator: 'Mehmet Ali Erbil',
    category: 'Bilim Kurgu & Gelecek',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-fuchsia-800/40 via-purple-950 to-neutral-950',
    rating: 4.86,
    totalDurationFormatted: '5 sa 45 dk',
    totalDurationSeconds: 20700,
    description: 'Dünya bir hiperuzay çevre yolu yapımı için yıkılmadan hemen önce Arthur Dent ve Ford Prefect\'in havlularını alarak çıktıkları absürt uzay yolculuğu.',
    chapters: [
      {
        id: 'ch-ogr-1',
        number: 1,
        title: 'Bölüm 1: Perşembe Sabahı ve Sarı Buldozerler',
        durationSeconds: 320,
        formattedDuration: '05:20',
        summary: 'Evi yıkılmak üzere olan Arthur Dent ve Vogon inşaat filosu.',
        script: 'Ev, köyün hemen ucundaki hafif bir bayırda tek başına duruyordu. Arthur Dent sabah uyandığında pencereden dışarı baktı ve bahçesinde dev sarı bir buldozer gördü. Henüz bilmediği şey, bu perşembenin hayatının en garip günü olacağı ve Dünya\'nın birkaç dakika içinde yok edileceğiydi.',
      }
    ]
  },

  // ================= 5. BİLİM & POPÜLER BİLİM (4 Eser) =================
  {
    id: 'book-sapiens',
    type: 'audiobook',
    title: 'Sapiens: Hayvanlardan Tanrılara',
    authorOrHost: 'Yuval Noah Harari',
    narrator: 'İlham Erdoğan',
    category: 'Bilim & Popüler Bilim',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-700/40 via-stone-950 to-neutral-950',
    rating: 4.96,
    totalDurationFormatted: '15 sa 20 dk',
    totalDurationSeconds: 55200,
    description: 'Bilişsel Devrim, Tarım Devrimi ve Bilimsel Devrim: Önemsiz bir primat türünün ortak kurgular ve mitler üreterek gezegenin hakimi haline geliş öyküsü.',
    chapters: [
      {
        id: 'ch-sap-1',
        number: 1,
        title: 'Bölüm 1: Önemsiz Bir Hayvan',
        durationSeconds: 360,
        formattedDuration: '06:00',
        summary: 'Doğu Afrika savanlarında yaşayan Homo cinsi ve dedikodu teorisi.',
        script: 'Yüz bin yıl önce yeryüzünde en az altı farklı insan türü yaşıyordu. Bugün ise sadece biz varız: Homo sapiens. Peki biz ne yaptık da kardeş türlerimizi yok ederek ekosistemin zirvesine tırmandık? Cevap Bilişsel Devrim\'de saklıdır: Sapiens, fiziksel olarak var olmayan ortak kurgulara inanabilen tek canlıdır.',
      }
    ]
  },
  {
    id: 'book-kozmos',
    type: 'audiobook',
    title: 'Kozmos: Evrenin ve İnsanın Serüveni',
    authorOrHost: 'Carl Sagan',
    narrator: 'Mazlum Kiper',
    category: 'Bilim & Popüler Bilim',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-blue-700/40 via-violet-950 to-neutral-950',
    rating: 4.94,
    totalDurationFormatted: '11 sa 40 dk',
    totalDurationSeconds: 42000,
    description: 'Yıldız tozundan evrilen bilincimizle evreni anlama arayışı. İskenderiye Kütüphanesi\'nden Samanyolu\'nun spiral kollarına şiirsel bilim yolculuğu.',
    chapters: [
      {
        id: 'ch-koz-1',
        number: 1,
        title: 'Bölüm 1: Kozmik Okyanusun Kıyıları',
        durationSeconds: 350,
        formattedDuration: '05:50',
        summary: 'Evren var olan, var olmuş ya da var olacak her şeydir.',
        script: 'Kozmos, var olan, var olmuş ya da var olacak her şeydir. Kozmos\'u düşünmek bile içimizi ürpertir. Omurgamızdan aşağı bir titreme iner, sesimiz fısıltıya dönüşür. Biliyoruz ki en derin gizemlerin eşiğindeyiz. Bizler yıldızların maddesinden yapıldık; biz evrenin kendini tanıma yoluyuz.',
      }
    ]
  },
  {
    id: 'book-zamanin-kisa-tarihi',
    type: 'audiobook',
    title: 'Zamanın Kısa Tarihi',
    authorOrHost: 'Stephen Hawking',
    narrator: 'Mehmet Atay',
    category: 'Bilim & Popüler Bilim',
    coverImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-indigo-900/40 via-purple-950 to-neutral-950',
    rating: 4.92,
    totalDurationFormatted: '7 sa 15 dk',
    totalDurationSeconds: 26100,
    description: 'Büyük Patlama\'dan kara deliklere, kuantum kütleçekiminden zamanın okuna modern fiziğin sınırlarında ufuk açıcı bir yolculuk.',
    chapters: [
      {
        id: 'ch-zkt-1',
        number: 1,
        title: 'Bölüm 1: Evren Resmimiz',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Aristoteles ve Batlamyus\'un kürelerinden genişleyen evren modeline astronomik devrim.',
        script: 'Eski zamanlarda bilge bir astronom Dünya\'nın Güneş etrafında döndüğünü anlattığında yaşlı bir kadın ayağa kalkıp "Bunlar saçmalık, dünya dev bir kaplumbağanın sırtında duruyor!" demişti. Hawking bu anekdotla başlar: Evrenin gerçek doğasını kavramak, zihnimizin konforlu sınırlarını aşmayı gerektirir.',
      }
    ]
  },
  {
    id: 'book-gen-bencil',
    type: 'audiobook',
    title: 'Gen Bencildir',
    authorOrHost: 'Richard Dawkins',
    narrator: 'Ali Düşenkalkar',
    category: 'Bilim & Popüler Bilim',
    coverImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-900/40 via-teal-950 to-neutral-950',
    rating: 4.87,
    totalDurationFormatted: '12 sa 10 dk',
    totalDurationSeconds: 43800,
    description: 'Evrimin gen merkezli bakış açısı: Özgecilik, iş birliği ve kültürel evrim mekanizması olarak "mem" (meme) kavramının doğuşu.',
    chapters: [
      {
        id: 'ch-gb-1',
        number: 1,
        title: 'Bölüm 1: İnsanlar Neden Var?',
        durationSeconds: 330,
        formattedDuration: '05:30',
        summary: 'Bizler sadece genlerimizin hayatta kalması için inşa edilmiş geçici biyolojik robotlar mıyız?',
        script: 'Canlılar, gen adı verilen bencil moleküllerin kendilerini kopyalamaları için programlanmış hayatta kalma makineleridir. Ancak insan beyni, genetik determinizme başkaldırıp özgecil değerler ve sanat üretebilen tek mekanizmadır.',
      }
    ]
  },

  // ================= 6. TARİH & BİYOGRAFİ (4 Kitap) =================
  {
    id: 'book-steve-jobs',
    type: 'audiobook',
    title: 'Steve Jobs',
    authorOrHost: 'Walter Isaacson',
    narrator: 'Engin Alkan',
    category: 'Tarih & Biyografi',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-zinc-700/40 via-stone-900 to-neutral-950',
    rating: 4.91,
    totalDurationFormatted: '16 sa 45 dk',
    totalDurationSeconds: 60300,
    description: 'Teknoloji, sanat ve ticareti birleştiren benzersiz bir vizyonerin hayatı. Macintosh, Pixar, iPod ve iPhone devrimlerinin perde arkası.',
    chapters: [
      {
        id: 'ch-sj-1',
        number: 1,
        title: 'Bölüm 1: Silikon Vadisi\'nde Bir Çocukluk',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Evlat edinilme, garajdaki lehim makineleri ve mükemmeliyetçilik tutkusu.',
        script: 'Steve Jobs, sanatla teknolojinin kesiştiği yerde duran nadir liderlerdendi. Babası Paul Jobs marangozluk yaparken ona şöyle demişti: "Çekmecenin arkasını hiç kimse görmeyecek olsa bile orayı da en kaliteli ahşaptan yapacaksın. Çünkü gerçek usta, görmediği yerin bile mükemmel olduğunu bilmelidir."',
      }
    ]
  },
  {
    id: 'book-nutuk',
    type: 'audiobook',
    title: 'Nutuk: Bir Milletin Doğuşu',
    authorOrHost: 'Mustafa Kemal Atatürk',
    narrator: 'Rüştü Asyalı',
    category: 'Tarih & Biyografi',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-red-800/40 via-neutral-900 to-neutral-950',
    rating: 4.99,
    totalDurationFormatted: '22 sa 30 dk',
    totalDurationSeconds: 81000,
    description: '1919 Mayıs\'ının 19\'uncu günü Samsun\'a ayak basışla başlayan bağımsızlık mücadelesi ve modern cumhuriyetin temellerinin bizzat lideri tarafından anlatımı.',
    chapters: [
      {
        id: 'ch-nt-1',
        number: 1,
        title: 'Bölüm 1: 1919 Senesi Mayısının 19\'uncu Günü',
        durationSeconds: 370,
        formattedDuration: '06:10',
        summary: 'Samsun\'a çıkış ve memleketin genel manzarası karşısında milletin azim ve kararı.',
        script: '1919 senesi Mayısı\'nın 19\'uncu günü Samsun\'a çıktım. Genel durum ve manzara şöyleydi: Osmanlı Devleti\'nin dahil bulunduğu grup, Harbi Umumi\'de mağlup olmuştu. Ordu dağıtılmış, memleket işgale uğramıştı. Bu vaziyet karşısında bir tek karar vardı: O da milli hakimiyete dayanan, kayıtsız şartsız, müstakil yeni bir Türk devleti tesis etmek!',
      }
    ]
  },
  {
    id: 'book-tufek-mikrop-celik',
    type: 'audiobook',
    title: 'Tüfek, Mikrop ve Çelik',
    authorOrHost: 'Jared Diamond',
    narrator: 'Mert Fırat',
    category: 'Tarih & Biyografi',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-900/40 via-yellow-950 to-neutral-950',
    rating: 4.9,
    totalDurationFormatted: '17 sa 15 dk',
    totalDurationSeconds: 62100,
    description: 'İnsan toplumlarının son 13 bin yıllık yazgısı: Coğrafi avantajlar, tarımın yayılışı ve kıtalar arasındaki güç dengelerinin nesnel kökenleri.',
    chapters: [
      {
        id: 'ch-tmc-1',
        number: 1,
        title: 'Bölüm 1: Yali\'nin Sorusu',
        durationSeconds: 330,
        formattedDuration: '05:30',
        summary: 'Neden Avrupalılar bu kadar çok kargo ve teknoloji üretti de yerli halklar üretemedi?',
        script: 'Yeni Gine sahilinde yerli bir politikacı olan Yali bana şu soruyu sormuştu: "Neden siz beyazların bu kadar çok kargosu var da biz Yeni Ginelilerin kendi kargomuz yok?" Bu basit soru beni insanlık tarihinin son 13 bin yılını coğrafya, hayvan evcilleştirme ve mikroplar üzerinden araştırmaya sevk etti.',
      }
    ]
  },
  {
    id: 'book-leonardo-da-vinci',
    type: 'audiobook',
    title: 'Leonardo da Vinci: Dehanın Biyografisi',
    authorOrHost: 'Walter Isaacson',
    narrator: 'Levent Dönmez',
    category: 'Tarih & Biyografi',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-800/40 via-stone-900 to-neutral-950',
    rating: 4.88,
    totalDurationFormatted: '14 sa 20 dk',
    totalDurationSeconds: 51600,
    description: 'Mona Lisa ve Son Akşam Yemeği\'nin yaratıcısının defterlerindeki anatomi, uçuş mekaniği ve doyumsuz çocuksu merakı.',
    chapters: [
      {
        id: 'ch-ldv-1',
        number: 1,
        title: 'Bölüm 1: Çocuğun Merakı ve Ağaçkakanın Dili',
        durationSeconds: 340,
        formattedDuration: '05:40',
        summary: 'Floransa atölyelerinden not defterlerine uzanan bitmek bilmeyen merak.',
        script: 'Leonardo da Vinci\'nin günlüklerinin bir kenarına karaladığı yapılacaklar listesinde şu sıra dışı not vardı: "Ağaçkakanın dilinin anatomisini incele." İşte Leonardo\'yu tarihin en büyük polimatı yapan şey bu amaçsız gibi görünen, saf ve çocuksu meraktı.',
      }
    ]
  },

  // ================= 7. PODCASTLER (ÇEŞİTLİ KATEGORİLER) =================
  {
    id: 'podcast-tekno-ai',
    type: 'podcast',
    title: 'Yapay Zeka Devrimi & Singularity',
    authorOrHost: 'Cemil Şinasi & Dr. Ece Tan',
    category: 'Teknoloji & Yapay Zeka',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-cyan-900/40 via-blue-950 to-neutral-950',
    rating: 4.93,
    totalDurationFormatted: '24 Bölüm • 18 sa',
    totalDurationSeconds: 64800,
    description: 'Yapay genel zeka (AGI), otonom ajanlar, derin öğrenme mimarileri ve insan-makine iş birliğinin yarattığı radikal gelecek dönüşümleri.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Bölüm 24: AGI Eşiğinde Bilişsel Sıçrama ve Antigravity Zekası',
    chapters: [
      {
        id: 'ch-pod-ai-1',
        number: 24,
        title: 'Bölüm 24: AGI Eşiğinde Bilişsel Sıçrama ve Antigravity Zekası',
        durationSeconds: 390,
        formattedDuration: '06:30',
        releaseDate: 'Bugün',
        isNew: true,
        summary: 'Yapay zekanın mekanik görevlerden sezgisel akıl yürütmeye geçişi ve düşünce zinciri protokolleri.',
        script: 'Herkese merhaba! Singularity ve Yapay Zeka Devrimi podcastine hoş geldiniz. Bugün insanlık tarihinin en kritik eşiğindeyiz. Antigravity ve çok modlu yapay zeka modelleri sadece metin üretmiyor; soyut ilişkiler kurup karmaşık sistemleri simüle edebiliyor. Bu bölümde yapay zekanın insanın düşünme hızını nasıl 10 katına çıkaracağını masaya yatırıyoruz.'
      },
      {
        id: 'ch-pod-ai-2',
        number: 23,
        title: 'Bölüm 23: Otonom Ajanlar ve Geleceğin Meslekleri',
        durationSeconds: 370,
        formattedDuration: '06:10',
        releaseDate: '3 gün önce',
        isNew: false,
        summary: 'Kendi kendine planlama yapıp kod yazan yapay zeka ajanlarının iş dünyasındaki etkisi.',
        script: 'Yapay zeka araç olmaktan çıkıp iş ortağı haline geldiğinde yazılımcılar, araştırmacılar ve tasarımcılar nasıl çalışacak? Kod yazmak artık bir inşaat işçiliği değil, bir orkestra şefliğine dönüşüyor.'
      }
    ]
  },
  {
    id: 'podcast-zihin-norobilim',
    type: 'podcast',
    title: 'Zihnin Sınırları & Nörobilim',
    authorOrHost: 'Dr. Kerem Dündar & Doç. Dr. Aslıhan Kurt',
    category: 'Bilim & Nörobilim',
    coverImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-violet-900/40 via-purple-950 to-neutral-950',
    rating: 4.96,
    totalDurationFormatted: '18 Bölüm • 14 sa',
    totalDurationSeconds: 50400,
    description: 'Modern beyin araştırmaları, dopamin regülasyonu, derin odaklanma (Deep Work), nöroplastisite ve zihinsel berraklık üzerine derinlemesine sohbetler.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Bölüm 18: Dijital Dikkat Dağınıklığı ve Odaklanma Devrimi',
    chapters: [
      {
        id: 'ch-pod-zn-1',
        number: 18,
        title: 'Bölüm 18: Dijital Dikkat Dağınıklığı ve Odaklanma Devrimi',
        durationSeconds: 380,
        formattedDuration: '06:20',
        releaseDate: 'Yeni',
        isNew: true,
        summary: 'Sürekli bildirim bombardımanında beynin prefrontal korteksi nasıl tükeniyor ve odak kası nasıl yeniden inşa edilir?',
        script: 'Herkese merhaba, Zihnin Sınırları\'nın 18. bölümüne hoş geldiniz. Bugün ekran süresiyle azalan dikkat süremizi konuşuyoruz. Prefrontal korteksimiz her bildirimde mikro-dopamin sıçramaları yaşarken, uzun vadeli derin düşünme kapasitemiz erozyona uğruyor. Nörobilimsel deneyler gösteriyor ki kesintisiz 20 dakikalık derin odaklanma, bilişsel esnekliğimizi %40 oranında yeniliyor.'
      },
      {
        id: 'ch-pod-zn-2',
        number: 17,
        title: 'Bölüm 17: Nöroplastisite: Beynimiz Yaşlandıkça Neden Değişebilir?',
        durationSeconds: 350,
        formattedDuration: '05:50',
        releaseDate: '1 hafta önce',
        isNew: false,
        summary: 'Yetişkin beyninde yeni sinirsel patikalar inşa etmenin biyolojik sırları.',
        script: 'Eskiden beynin 25 yaşından sonra değişmez bir yapıya büründüğü zannedilirdi. Oysa son fonksiyonel MR çalışmaları, yeni bir dil öğrenmenin veya enstrüman çalmanın 60 yaşında bile hipokampusta yeni sinaptik bağlantılar oluşturduğunu kanıtlıyor.'
      }
    ]
  },
  {
    id: 'podcast-tarih-antik',
    type: 'podcast',
    title: 'Kayıp Medeniyetler & Kadim Sırlar',
    authorOrHost: 'Prof. Dr. İlber Demir & Deniz Aras',
    category: 'Tarih & Kadim Uygarlıklar',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-900/40 via-yellow-950 to-neutral-950',
    rating: 4.95,
    totalDurationFormatted: '16 Bölüm • 15 sa',
    totalDurationSeconds: 54000,
    description: 'Göbeklitepe\'den Antik Mısır\'a, İnka tapınaklarından İskenderiye Kütüphanesi\'ne arkeolojinin en büyüleyici gizemleri ve unutulmuş uygarlıklar.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Bölüm 16: Göbeklitepe: Tarihin Sıfır Noktası ve Yıldız Tapınakları',
    chapters: [
      {
        id: 'ch-pod-ta-1',
        number: 16,
        title: 'Bölüm 16: Göbeklitepe: Tarihin Sıfır Noktası ve Yıldız Tapınakları',
        durationSeconds: 395,
        formattedDuration: '06:35',
        releaseDate: 'Dün',
        isNew: true,
        summary: '12 bin yıl önceki avcı-toplayıcı insanların devasa T-biçimli kireçtaşı sütunları astronomik dizilimle nasıl inşa ettikleri.',
        script: 'Tarihin bildiğimiz tüm ezberlerini bozan Şanlıurfa topraklarına uzanıyoruz. Göbeklitepe, yerleşik hayata geçişin tarımla değil, dinsel ve kozmik ritüellerle başladığını gösterdi. Tonlarca ağırlıktaki T biçimli sütunlar üzerindeki tilki, akbaba ve aslan kabartmaları bize ne anlatmak istiyordu?'
      },
      {
        id: 'ch-pod-ta-2',
        number: 15,
        title: 'Bölüm 15: İskenderiye Kütüphanesi ve Küllerin Altındaki Bilgelik',
        durationSeconds: 360,
        formattedDuration: '06:00',
        releaseDate: '1 hafta önce',
        isNew: false,
        summary: 'Antik dünyanın bilgi mabedinin trajik sonu ve kaybolan parşömenlerin insanlığa maliyeti.',
        script: 'Yüz binlerce papirüs rulosunun saklandığı İskenderiye Kütüphanesi alevler içinde kaldığında, sadece kağıtlar değil, astronomi, tıp ve geometrinin bin yıllık birikimi de yok oldu. Eğer o kütüphane yanmasaydı, Sanayi Devrimi iki bin yıl önce gerçekleşebilir miydi?'
      }
    ]
  },
  {
    id: 'podcast-psikoloji-iliskiler',
    type: 'podcast',
    title: 'İçsel Pusula & İlişki Dinamikleri',
    authorOrHost: 'Uzm. Psk. Melis Akın & Tolga Kara',
    category: 'Psikoloji & İnsan İlişkileri',
    coverImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-rose-900/40 via-pink-950 to-neutral-950',
    rating: 4.91,
    totalDurationFormatted: '22 Bölüm • 16 sa',
    totalDurationSeconds: 57600,
    description: 'Bağlanma kuramı, çocukluk şemaları, narsist kişiliklerle başa çıkma, duygusal sınırlar koyma ve sağlıklı sevgi inşa etme sanatı.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Bölüm 22: Güvenli Bağlanma ve İlişkilerde Hayır Diyebilme Sanatı',
    chapters: [
      {
        id: 'ch-pod-psi-1',
        number: 22,
        title: 'Bölüm 22: Güvenli Bağlanma ve İlişkilerde Hayır Diyebilme Sanatı',
        durationSeconds: 375,
        formattedDuration: '06:15',
        releaseDate: 'Bugün',
        isNew: true,
        summary: 'Kaygılı ve kaçıngan bağlanma döngüsünü kırma ve suçluluk hissetmeden sınır çekme adımları.',
        script: 'İlişkilerimizde neden hep aynı tip insanlara çekiliriz? Çocuklukta hissettiğimiz ihmal veya aşırı korumacılık, yetişkinlikte partner seçimlerimizin görünmez senaryosunu yazar. Hayır demek bir bencillik değil, ruhsal bütünlüğümüzü koruyan en temel sevgi eylemidir.'
      },
      {
        id: 'ch-pod-psi-2',
        number: 21,
        title: 'Bölüm 21: İçimizdeki Yaralı Çocukla Barışmak ve Öz Şefkat',
        durationSeconds: 380,
        formattedDuration: '06:20',
        releaseDate: '4 gün önce',
        isNew: false,
        summary: 'Kendi kendimize acımasız eleştirmen olmak yerine şefkatli ebeveyn olmayı öğrenmek.',
        script: 'Aynaya baktığınızda kendinize söylediğiniz ilk cümle nedir? Çoğumuz en yakın arkadaşımıza asla söylemeyeceğimiz acımasız sözleri kendimize fısıldarız. Öz şefkat, zor anlarda kendi elimizi tutabilmektir.'
      }
    ]
  },
  {
    id: 'podcast-girisimcilik-finans',
    type: 'podcast',
    title: 'Sıfırdan Zirveye: Finansal Özgürlük',
    authorOrHost: 'Barış Özkan & Selin Yıldız',
    category: 'Girişimcilik & Finans',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-900/40 via-teal-950 to-neutral-950',
    rating: 4.89,
    totalDurationFormatted: '30 Bölüm • 25 sa',
    totalDurationSeconds: 90000,
    description: 'Pasif gelir sistemleri, bileşik getiri sihri, girişimcilikte ilk 100 gün ve enflasyonist dünyada varlık koruma taktikleri.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Bölüm 30: Finansal Özgürlüğün 4 Temel Kuralı ve Bileşik Getiri',
    chapters: [
      {
        id: 'ch-pod-fin-1',
        number: 30,
        title: 'Bölüm 30: Finansal Özgürlüğün 4 Temel Kuralı ve Bileşik Getiri',
        durationSeconds: 385,
        formattedDuration: '06:25',
        releaseDate: 'Yeni',
        isNew: true,
        summary: 'Zamanın kaldıraç gücünü kullanarak finansal bağımsızlığa ulaşma ve yatırımları otomatize etme.',
        script: 'Finansal özgürlük, lüks harcamalar yapmak değil; istemediğin hiçbir şeye zorunluluktan "evet" dememek demektir. Albert Einstein bileşik getiriye "dünyanın sekizinci harikası" demişti. Her ay düzenli birikim yapıp bunu verimli varlıklara yatıran bir zihin, 10 yıl sonra zamanının tek sahibi haline gelir.'
      },
      {
        id: 'ch-pod-fin-2',
        number: 29,
        title: 'Bölüm 29: Sıfır Sermayeyle Dijital Ürün Üretimi ve Ölçeklenme',
        durationSeconds: 365,
        formattedDuration: '06:05',
        releaseDate: '6 gün önce',
        isNew: false,
        summary: 'Yazılım, e-bülten veya sesli içerik üreterek global müşterilere ulaşma formülleri.',
        script: 'Geleneksel ticarette fiziksel envanter maliyeti varken, bilgi ekonomisinde ürettiğiniz bir dijital ürün sıfır marjinal maliyetle milyonlarca insana ulaşabilir. Bu bölümde mikro-SaaS ve dijital varlık inşa etmeyi inceliyoruz.'
      }
    ]
  },
  {
    id: 'podcast-suc-kriminal',
    type: 'podcast',
    title: 'Karanlık Dosyalar & Suç Psikolojisi',
    authorOrHost: 'Av. Murat Sezgin & Adli Tıp Uzm. Serra Erdem',
    category: 'Gerçek Suç & Kriminal Dosyalar',
    coverImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-zinc-900/50 via-neutral-950 to-black',
    rating: 4.97,
    totalDurationFormatted: '20 Bölüm • 17 sa',
    totalDurationSeconds: 61200,
    description: 'Tarihin çözülmemiş en esrarengiz soğuk vakaları, adli tıp DNA analizleri, seri katillerin zihin yapısı ve kriminal profil çıkarma.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Bölüm 20: Zodiac Şifreleri ve 50 Yıllık FBI Soğuk Dosyası',
    chapters: [
      {
        id: 'ch-pod-suc-1',
        number: 20,
        title: 'Bölüm 20: Zodiac Şifreleri ve 50 Yıllık FBI Soğuk Dosyası',
        durationSeconds: 410,
        formattedDuration: '06:50',
        releaseDate: 'Yeni',
        isNew: true,
        summary: 'San Francisco körfezini dehşete düşüren esrarengiz katilin mektuplarındaki kriptografik bilmeceler.',
        script: '1969 yılında gazetelere gönderilen 340 karakterlik karmaşık şifreli mektup, dünyanın en iyi kriptologlarını yarım asır boyunca çaresiz bıraktı. Kriminal psikolojide failin polislerle zihinsel bir satranç oynama arzusu, narsisistik kişilik bozukluğunun en uç örneğidir.'
      },
      {
        id: 'ch-pod-suc-2',
        number: 19,
        title: 'Bölüm 19: Olay Yeri İnceleme: Mikroskobik DNA İzleri',
        durationSeconds: 370,
        formattedDuration: '06:10',
        releaseDate: '1 hafta önce',
        isNew: false,
        summary: 'Tek bir saç teli ve dokunma DNA\'sı ile 30 yıl önceki faili meçhul cinayetleri aydınlatan genetik soybilim.',
        script: 'Adli tıbbın altın kuralı: "Her temas bir iz bırakır." Suç mahalli asla tamamen sessiz değildir; oradaki moleküler kanıtlar katilin kimliğini sessizce haykırır.'
      }
    ]
  },
  {
    id: 'podcast-saglik-biyohack',
    type: 'podcast',
    title: 'Biyohack & Uzun Yaşamın Sırları',
    authorOrHost: 'Dr. Caner Bozkurt & Fitoterapist Defne Kaya',
    category: 'Sağlık & Biyohack',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-teal-900/40 via-emerald-950 to-neutral-950',
    rating: 4.88,
    totalDurationFormatted: '19 Bölüm • 14 sa',
    totalDurationSeconds: 50400,
    description: 'Hücresel gençleşme, aralıklı oruç ve otofaji protokolleri, sirkadiyen uyku optimizasyonu, soğuk duş terapisi ve bilişsel takviyeler.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Bölüm 19: Derin Uyku Mimarisi ve Sabah Güneşinin Sirkadiyen Gücü',
    chapters: [
      {
        id: 'ch-pod-sag-1',
        number: 19,
        title: 'Bölüm 19: Derin Uyku Mimarisi ve Sabah Güneşinin Sirkadiyen Gücü',
        durationSeconds: 380,
        formattedDuration: '06:20',
        releaseDate: 'Bugün',
        isNew: true,
        summary: 'Uyanır uyanmaz ilk 30 dakikada gökyüzüne bakmanın kortizol ve melatonin ritmi üzerindeki hayati etkisi.',
        script: 'Gözlerimiz sadece görmeye yaramaz; beynimizin hipotalamusundaki ana saat olan suprakiyazmatik çekirdeğe günün saatini bildiren birer ışık sensörüdür. Sabah güneşi almak, gece derin uykuya dalış sürenizi yarı yarıya kısaltır ve büyüme hormonu salgısını maksimize eder.'
      },
      {
        id: 'ch-pod-sag-2',
        number: 18,
        title: 'Bölüm 18: Hücresel Otofaji ve Mitokondriyal Gençleşme',
        durationSeconds: 360,
        formattedDuration: '06:00',
        releaseDate: '5 gün önce',
        isNew: false,
        summary: '16 saatlik açlıkta hücrelerin kendi çöpünü temizleme mekanizması.',
        script: '2016 Nobel Tıp Ödülü alan otofaji keşfi, hücrelerimizin aç kaldığında yaşlı ve hasarlı proteinleri parçalayarak geri dönüştürdüğünü gösterdi. Doğru aralıklı oruç protokolü ile biyolojik yaşınızı takvim yaşınızın gerisine çekmek mümkün.'
      }
    ]
  },
  {
    id: 'podcast-kultur-sinema',
    type: 'podcast',
    title: 'Kadraj Arkası: Sinema & Kültür Sohbetleri',
    authorOrHost: 'Kerem Akça & Sinem Güven',
    category: 'Kültür, Sanat & Sinema',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-red-950/40 via-neutral-900 to-neutral-950',
    rating: 4.87,
    totalDurationFormatted: '25 Bölüm • 21 sa',
    totalDurationSeconds: 75600,
    description: 'Usta yönetmenlerin kamera dili, sinematografi teknikleri, kült senaryolar, bağımsız film festivalleri ve modern görsel kültür eleştirileri.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Bölüm 25: Christopher Nolan Sinemasında Zaman ve Rüya Labirentleri',
    chapters: [
      {
        id: 'ch-pod-ks-1',
        number: 25,
        title: 'Bölüm 25: Christopher Nolan Sinemasında Zaman ve Rüya Labirentleri',
        durationSeconds: 390,
        formattedDuration: '06:30',
        releaseDate: 'Dün',
        isNew: true,
        summary: 'Memento\'dan Oppenheimer\'a, Inception\'dan Interstellar\'a lineer olmayan kurgu ve pratik efekt dehası.',
        script: 'Kadraj Arkası\'na hoş geldiniz! Nolan için zaman, bir filmde manipüle edilecek en esnek enstrümandır. Inception\'daki katmanlı rüya sahnelerinde yerçekimsiz koridor sahnesinin CGI yerine dönen dev bir silindir dekorla çekilmesi sinema tutkusunun en somut kanıtıdır.'
      },
      {
        id: 'ch-pod-ks-2',
        number: 24,
        title: 'Bölüm 24: Blade Runner ve Siberpunk Estetiğinin Felsefesi',
        durationSeconds: 375,
        formattedDuration: '06:15',
        releaseDate: '1 hafta önce',
        isNew: false,
        summary: 'Philip K. Dick\'ten Ridley Scott\'a: Replikantlar gerçekten insan mıdır?',
        script: '"Gözyaşları yağmurda kaybolup gidecek..." Rutger Hauer\'in doğaçlama eklediği o efsanevi replik, yapay varlıkların ölüm karşısındaki varoluşsal hüznünü tarihe kazıdı.'
      }
    ]
  },
  {
    id: 'podcast-felsefe-varolus',
    type: 'podcast',
    title: 'Sokrates\'in Kahvesi & Yaşamın Anlamı',
    authorOrHost: 'Doç. Dr. Ozan Çağlar & Nazlı Bilge',
    category: 'Felsefe & Varoluş',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-800/40 via-orange-950 to-neutral-950',
    rating: 4.94,
    totalDurationFormatted: '21 Bölüm • 19 sa',
    totalDurationSeconds: 68400,
    description: 'Antik Yunan\'dan modern varoluşçuluğa gündelik yaşamda felsefe: Stoacılık pratikleri, Albert Camus ve absürt yaşamda kendi anlamını yaratma cesareti.',
    isNewEpisodeAvailable: true,
    latestEpisodeTitle: 'Bölüm 21: Stoacı Dinginlik: Kontrol Edebileceklerin ve Edemeyeceklerin',
    chapters: [
      {
        id: 'ch-pod-fel-1',
        number: 21,
        title: 'Bölüm 21: Stoacı Dinginlik: Kontrol Edebileceklerin ve Edemeyeceklerin',
        durationSeconds: 385,
        formattedDuration: '06:25',
        releaseDate: 'Bugün',
        isNew: true,
        summary: 'Epiktetos\'un kontrol ikiliği prensibiyle trafikte, işte ve kriz anlarında iç huzuru koruma rehberi.',
        script: 'Epiktetos şöyle der: "Hayatta iki şey vardır: Senin kontrolünde olanlar ve olmayanlar. Başkalarının düşünceleri, hava durumu veya geçmiş senin elinde değildir; ama bunlara verdiğin tepki tamamen senin egemenliğindedir." Bu basit ayrım, modern anksiyetenin en büyük panzehiridir.'
      },
      {
        id: 'ch-pod-fel-2',
        number: 20,
        title: 'Bölüm 20: Albert Camus ve Sisifos Söyleni: Absürde Başkaldırı',
        durationSeconds: 370,
        formattedDuration: '06:10',
        releaseDate: '4 gün önce',
        isNew: false,
        summary: 'Kayayı dağın tepesine her gün yeniden yuvarlarken mutlu olmayı öğrenmek.',
        script: 'Evren bize hazır bir anlam sunmaz; tam da bu yüzden insan kendi anlamını kendisi inşa etmek zorundadır. Sisifos kayasının başında dururken pes etmez; absürdü kabul edip yaşamaya devam etmek en büyük devrimdir.'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Yeni Bölüm Yayınlandı!',
    message: '🎙️ "Zihnin Sınırları & Nörobilim" podcastinin 18. Bölümü: "Dijital Dikkat Dağınıklığı ve Odaklanma Devrimi" yayında.',
    dateFormatted: '15 dakika önce',
    read: false,
    targetItemId: 'podcast-zihin-norobilim',
    targetChapterId: 'ch-pod-zn-1',
    type: 'new_episode'
  },
  {
    id: 'notif-2',
    title: 'Yeni Podcast Bölümü',
    message: '🚀 "Teknoloji & Geleceğin Dünyası" serisine Bölüm 32 eklendi: "AGI Eşiğinde İnsan Yaratıcılığı".',
    dateFormatted: '2 saat önce',
    read: false,
    targetItemId: 'podcast-tekno-trend',
    targetChapterId: 'ch-pod-tek-1',
    type: 'new_episode'
  },
  {
    id: 'notif-3',
    title: 'Antigravity Okuma Önerisi',
    message: '✨ "Simyacı" kitabında kaldığınız bölüm için Antigravity derin felsefi analizi ve içgörüleri hazır.',
    dateFormatted: 'Dün',
    read: true,
    targetItemId: 'book-simyaci',
    targetChapterId: 'ch-s-1',
    type: 'ai_insight'
  }
];

import { EN_LIBRARY_ITEMS } from './englishLibraryData';

export const EN_LIBRARY: LibraryItem[] = EN_LIBRARY_ITEMS;

export const EN_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New Episode Published!',
    message: '🎙️ "Boundaries of the Mind" Episode 18: "Digital Distraction and the Focus Revolution" is now live.',
    dateFormatted: '15 minutes ago',
    read: false,
    targetItemId: 'podcast-zihin-norobilim',
    targetChapterId: 'ch-pod-zn-1',
    type: 'new_episode'
  },
  {
    id: 'notif-2',
    title: 'New Podcast Episode',
    message: '🚀 Episode 32 added to "Technology & Future Horizons": "Human Creativity at the AGI Frontier".',
    dateFormatted: '2 hours ago',
    read: false,
    targetItemId: 'podcast-tekno-trend',
    targetChapterId: 'ch-pod-tek-1',
    type: 'new_episode'
  },
  {
    id: 'notif-3',
    title: 'Antigravity Reading Insight',
    message: '✨ Deep philosophical analysis and chapter insights for "The Alchemist" are ready for your session.',
    dateFormatted: 'Yesterday',
    read: true,
    targetItemId: 'book-simyaci',
    targetChapterId: 'ch-s-1',
    type: 'ai_insight'
  }
];

export function getLocalizedLibrary(lang: 'tr' | 'en'): LibraryItem[] {
  return lang === 'en' ? EN_LIBRARY : INITIAL_LIBRARY;
}

export function getLocalizedNotifications(lang: 'tr' | 'en'): AppNotification[] {
  return lang === 'en' ? EN_NOTIFICATIONS : INITIAL_NOTIFICATIONS;
}
