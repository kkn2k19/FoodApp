package com.karan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.karan.model.Order;
import com.karan.model.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @SuppressWarnings("rawtypes") // it will supress warnings of List datatype not specified
    @Query(nativeQuery = true, value = "select o.oid, o.odt, o.fid, f.fname, o.oqty, f.fprice, f.fprice*o.oqty as totalcost, o.uname from order_dtls as o join food as f on (o.fid = f.fid)")
    public List billing(); // list type not specified as we dont't know the type since it is mixture of
                           // food, order and no table of that datatype created

    @Query("""
            SELECT o FROM Order o
            LEFT JOIN FETCH o.items
            WHERE o.user = :user
            """)
    List<Order> findByUserWithItems(User user);

    @Query("""
            SELECT o FROM Order o
            LEFT JOIN FETCH o.items
            """)
    List<Order> findAllWithItems();

    List<Order> findByUser(User user);

}
