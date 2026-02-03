---
title: "정적 팩토리 메소드의 장단점"
date: 2023-07-07T00:15:20+09:00
draft: false
tags: ["Java", "이펙티브자바", "디자인패턴"]
categories: ["Java"]
author: "Lee WooJin"
showToc: true
TocOpen: false
description: "이펙티브 자바 - 정적 팩토리 메소드의 장점과 활용 방법"
---

## 들어가며

오늘 이펙티브 자바를 읽으면서 정적 팩토리의 장점에 대해서 읽는데 뭔가 체감이 되지 않았습니다. 그래서 책에서 말하는 장점 코드에 대해서 작성해보고 설명해보는 시간을 가지려고 합니다.

![정적 팩토리 메소드](/images/posts/java-static-factory-method/정적-팩토리-메소드.jpg)

## 정적 팩토리 메소드의 장점

### 1. 이름을 가질 수 있다

일반 public 생성자는 많이들 익숙하시죠? 하지만 우리가 생성자를 만들 때 함수명처럼 이름이 존재하지 않았어요.

정적 팩토리 메소드는 이름을 가질 수 있어 무슨 일을 하고 어떤 걸 만드는지 파악할 수 있어요!

```java
public class Car {
    private String model;
    private int year;

    private Car(String model, int year) {
        this.model = model;
        this.year = year;
    }

    public static Car createSportsCar() {
        return new Car("Sports Car", 2023);
    }

    public static Car createFamilyCar() {
        return new Car("Family Car", 2023);
    }
}
```

### 2. 호출될 때마다 인스턴스를 새로 생성하지 않아도 된다

`DatabaseConnection` 객체를 가져오고 싶을 때마다 새로 생성하는 게 아닌 기존에 존재하면 재사용하고 없다면 생성해서 반환하는 형식을 가질 수 있습니다.

```java
public class DatabaseConnection {
    private static final Map<String, DatabaseConnection> connectionCache = new HashMap<>();

    private DatabaseConnection(String url) {
        // 데이터베이스 연결 초기화 작업
    }

    public static DatabaseConnection getConnection(String url) {
        DatabaseConnection connection = connectionCache.get(url);
        if (connection == null) {
            connection = new DatabaseConnection(url);
            connectionCache.put(url, connection);
        }
        return connection;
    }
}
```

### 3. 반환 타입의 하위 타입 객체를 반환할 수 있다

Store 객체를 상속받고 있는 `HugeStore`와 `SmallStore` 중 하나를 선택해서 반환이 가능합니다.

### 4. 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환할 수 있다

스토어를 사용하는 인원이 100만이 넘어가면 `HugeStore`를 생성하고 100만 이하이면 `SmallStore`를 반환하게 됩니다.

```java
public abstract class Store {
    private Integer customer_count;

    public Store(Integer customer_count) {
        this.customer_count = customer_count;
    }

    public static Store createStore(Integer customer_count) {
        if (customer_count >= 1_000_000) {
            return HugeStore.of(customer_count);
        }
        return SmallStore.of(customer_count);
    }
}
```

```java
class HugeStore extends Store {
    private String name = "huge";

    public HugeStore(Integer customer_count) {
        super(customer_count);
    }
}
```

```java
public class SmallStore extends Store {
    private String name = "small";

    public SmallStore(Integer customer_count) {
        super(customer_count);
    }
}
```

```java
public class Example {
    public static void main(String[] args) {
        Store store = Store.createStore(1_000_001);
        if (store instanceof HugeStore) {
            System.out.println("huge");
        } else {
            System.out.println("small");
        }
    }
}
```

### 5. 정적 팩터리 메서드를 작성하는 시점에는 반환할 객체의 클래스가 존재하지 않아도 된다

```java
class MyBook {
    public static <T> List<T> getBookList() {
        return new ArrayList<T>();
    }
}

public class Example2 {
    public static void main(String[] args) {
        List<Integer> bookList = MyBook.getBookList();
    }
}
```

이 메서드는 ArrayList 객체를 생성하고 반환하므로, 반환할 객체의 클래스를 미리 지정하지 않고도 유연하게 다양한 타입의 리스트 객체를 생성할 수 있습니다.

## 결론

정적 팩터리 메서드와 public 생성자는 각자의 쓰임새가 있으니 상대적인 장단점을 이해하고 사용하는 것이 좋습니다. 그렇다고 하더라도 정적 팩터리를 사용하는 게 유리한 경우가 더 많습니다.
